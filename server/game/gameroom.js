////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var GameRoomData = require('./data_gameroom.js');
var Card = require('./card.js');
var CardDeck = require('./carddeck.js');

////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = GameRoom;


function GameRoom (_gameId, _hostClient) {
    // -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error.
    // -----------------------------------------------------------------------------
    if (typeof(_gameId) === 'undefined') { throw new Error('_gameId parameter in GameRoom constructor is undefined.'); }
    if (typeof(_hostClient) === 'undefined') { throw new Error('_hostClient parameter in GameRoom constructor is undefined.'); }

    // -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
    this.m_data          = new GameRoomData(_gameId);
    this.m_hostClient    = _hostClient;

    this.m_maxRounds       = 0;
    this.m_currentRound    = 0;
    this.m_indexOfDealer   = 0;
    this.m_trumpCard       = null;
    this.m_lastTrickWinner = null;
    this.m_firstPlayedCard = null;
    this.m_firstPlayedSuit = null;



    ////////////////////////////////////////////////////////////////////////////////
    /// \fn playerJoinGame()
    ///
    /// \brief Add player to game room
    ////////////////////////////////////////////////////////////////////////////////
    this.playerJoin = function(_player) {

        this.m_data.addPlayer(_player);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn playerLeaveGame()
    ///
    /// \brief Remove player from game room
    ////////////////////////////////////////////////////////////////////////////////
    this.playerLeave = function(_playerId) {

        this.m_data.removePlayerById(_playerId);
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn startNewRound()
    ///
    /// \brief Starts a new round by dealing cards etc..
    ////////////////////////////////////////////////////////////////////////////////
    this.startRound = function() {
        // -----------------------------------------------------------------------------
        // Reset card deck, shuffle and deal the cards
        // -----------------------------------------------------------------------------
        this.m_data.cardDeck.reset();

        this.m_data.cardDeck.shuffle();

        this.dealCards();

        // -----------------------------------------------------------------------------
        // Choose a trump card for the round, but only if it is not the last round.
        // -----------------------------------------------------------------------------
        if (!this.isLastRound())
        {
            this.m_trumpCard = this.m_currentRound.cardDeck.getCard();
            this.m_hostClient.emit(global.events.out.NEW_TRUMP_CARD, this.m_trumpCard);
        }

        // -----------------------------------------------------------------------------
        // Initialize new round for each player
        // -----------------------------------------------------------------------------
        for (var indexOfPlayer = 0; indexOfPlayer < this.m_data.getNumberOfPlayers(); indexOfPlayer++)
        {
            this.m_data.players[indexOfPlayer].initializeNewRound();
        }

        // -----------------------------------------------------------------------------
        // Set the game state to be ready for trick guessing
        // -----------------------------------------------------------------------------
        this.m_data.setState(GameRoomData.States.READY_TO_GUESS_TRICKS);

        // -----------------------------------------------------------------------------
        // Notify the player which is allowed to play the first card
        // -----------------------------------------------------------------------------
        var playerIndex = this.getIndexOfDealersNeighbor();
        this.m_data.players[playerIndex].emit(global.events.out.PLAYER_BEGIN_TURN);
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn dealCards()
    ///
    /// \brief Deal the cards
    ////////////////////////////////////////////////////////////////////////////////
    this.dealCards = function() {
        // -----------------------------------------------------------------------------
        // Loop through the number of rounds and through each player per round.
        // -----------------------------------------------------------------------------
        for (var indexOfRound = 0; indexOfRound < this.m_currentRound; indexOfRound++)
        {
            for (var indexOfPlayer = 0; indexOfPlayer < this.m_data.getNumberOfPlayers(); indexOfPlayer++)
            {   
                var card = this.m_data.cardDeck.getCard();

                this.m_data.players[indexOfPlayer].addCard(card);
                this.m_data.players[indexOfPlayer].emit(global.events.out.NEW_HAND_CARD, card);
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn playerGuessedTricks()
    ///
    /// \brief Sets the guessed tricks per player
    ////////////////////////////////////////////////////////////////////////////////
    this.playerGuessedTricks = function(_playerId, _numberOfGuessedTricks) {
        // ----------------------------------------------------------------------------
        // Get the player and and set the guessed tricks
        // ----------------------------------------------------------------------------
        var player = this.m_data.getPlayerById(_playerId);
        player.m_stats.setGuessedTricks(_numberOfGuessedTricks);

        // ----------------------------------------------------------------------------
        // Notify host that a player guessed the tricks
        // ----------------------------------------------------------------------------
        var data = { 
            playerId: player.getId(),
            guessedTricks: _numberOfGuessedTricks,
            roundNumber: this.m_currentRound
        };
        this.m_hostClient.emit(global.events.PLAYER_GUESSED_TRICKS, data);

        // ----------------------------------------------------------------------------
        // Check if everyone guessed tricks in the current round, and if so notify the
        // game members (players and host)
        // ----------------------------------------------------------------------------
        if (this.hasEveryPlayerGuessedTricks()) 
        {
            this.emitToAll(global.events.ALL_TRICKS_GUESSED);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn playerThrowCard()
    ///
    /// \brief Implements the logic in order to throw a card for the player
    ////////////////////////////////////////////////////////////////////////////////
    this.playerThrowCard = function(_playerId, _card) {
        // ----------------------------------------------------------------------------
        // Get the player and check if he already played in this trick turn
        // ----------------------------------------------------------------------------
        var player = this.m_data.getPlayerById(_playerId);

        if (player.m_hasPlayedCardInTurn)
        {
            // ----------------------------------------------------------------------------
            // Notify the player that he is not allowed to throw a card
            // ----------------------------------------------------------------------------
            var data = { card: _card };
            player.emit(global.events.CARD_NOT_ALLOWED, data);
        }
        
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn isCardAllowed()
    ///
    /// \brief Checks if a given card is allowed to play by the given player
    ////////////////////////////////////////////////////////////////////////////////
    this.isCardAllowed = function(_player, _card) {
        // ----------------------------------------------------------------------------
        // Check if the player already made a move in this turn
        // ----------------------------------------------------------------------------
        if (_player.m_hasPlayedCardInTurn) 
        {
            return false;
        }

        // ----------------------------------------------------------------------------
        // Check if this is the first trick turn and the first card hasn't been played
        // ----------------------------------------------------------------------------
        if (this.m_lastTrickWinner === null && this.m_firstPlayedCard === null)
        {
            // ----------------------------------------------------------------------------
            // It is the first trick turn in this round, so check if the player who wants
            // to throw the card is the one who sits next to the dealer
            // ----------------------------------------------------------------------------
            var dealersNeighbor = this.m_data.players[this.getIndexOfDealersNeighbor()];

            if (_player.getId() === dealersNeighbor.getId())
            {
                this.m_firstPlayedCard = _card;
                this.setFirstPlayedSuit(_card.suit);
                return true;
            }
        }
        else if (this.m_lastTrickWinner !== null && this.m_firstPlayedCard === null)
        {
            // ----------------------------------------------------------------------------
            // Check if the player of the first card is the winner of the last trick round
            // ----------------------------------------------------------------------------
            if (this.m_lastTrickWinner.getId() === _player.getId())
            {
                this.m_firstPlayedCard = _card;
                this.setFirstPlayedSuit(_card.suit);
                return true;
            }
        }
        else 
        {
            // ----------------------------------------------------------------------------
            // Check if the the _card is a wizard of a fool
            // ----------------------------------------------------------------------------
            if (_card.suit === 'wizard' || _card.suit == 'fool')
            {
                return true;
            }

            // ----------------------------------------------------------------------------
            // Check if the if there is already a played suit (other than wizard or fool)
            // ----------------------------------------------------------------------------
            if (this.m_firstPlayedSuit === null)
            {
                setFirstPlayedSuit(_card.suit);
                return true;
            }

            // ----------------------------------------------------------------------------
            // Check if the _card matches the first played suit
            // ----------------------------------------------------------------------------
            if (this.m_firstPlayedSuit === _card.suit)
            {
                return true;
            }

            // ----------------------------------------------------------------------------
            // The _card does not match the first played suit. This is only allowed
            // if the player does not have a card with this specific first played suit.
            // ----------------------------------------------------------------------------
            if (_player.hasCardWithSuit(this.m_firstPlayedSuit) === false)
            {
                return true;
            }
        }

        return false;
    } 
    
    ////////////////////////////////////////////////////////////////////////////////
    /// \fn prepareForStart()
    ///
    /// \brief Prepares the game room to be ready for starting
    ////////////////////////////////////////////////////////////////////////////////
    this.prepareForStart = function() {
        // -----------------------------------------------------------------------------
        // Create the card deck
        // -----------------------------------------------------------------------------
        this.createCardDeck();

        // -----------------------------------------------------------------------------
        // Calculate the number of possible rounds.
        // -----------------------------------------------------------------------------
        var numberOfCards   = this.m_data.cardDeck.getNumberOfCards();
        var numberOfPlayers = this.m_data.getNumberOfPlayers();

        this.m_maxRounds = Math.ceil(numberOfCards / numberOfPlayers);  

        // -----------------------------------------------------------------------------
        // Set the game state to ready for a new round.
        // -----------------------------------------------------------------------------        
        this.m_data.setState(GameRoomData.States.READY_FOR_NEW_ROUND);

        // -----------------------------------------------------------------------------
        // Notify the players and the host that the game is ready for the first round.
        // -----------------------------------------------------------------------------
        var data = { maxRounds: this.m_maxRounds };
        this.emitToAll(global.events.out.GAME_STARTS, data);

        // -----------------------------------------------------------------------------
        // Notify the player which is considerd to be the first dealer.
        // -----------------------------------------------------------------------------
        this.m_data.players[this.m_indexOfDealer].emit(global.events.out.PLAYER_IS_DEALER);
    };



    ////////////////////////////////////////////////////////////////////////////////
    /// \fn isLastRound()
    ///
    /// \return true or false if the current round is the last one
    ////////////////////////////////////////////////////////////////////////////////
    this.isLastRound = function () {

        return this.m_currentRound === this.m_maxRounds ? true : false;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getIndexOfDealersNeighbor()
    ///
    /// \return The index of the dealers neighbor
    ////////////////////////////////////////////////////////////////////////////////
    this.getIndexOfDealersNeighbor = function() {
        // -----------------------------------------------------------------------------
        // The neighbor of the last player in the array is of course the first one :)
        // -----------------------------------------------------------------------------
        if ((this.m_indexOfDealer + 1) === this.m_data.getNumberOfPlayers()) 
        {
            return 0;
        }
        return this.m_indexOfDealer + 1;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn emitToAll()
    ///
    /// \return Sends a message to all players and the host
    ////////////////////////////////////////////////////////////////////////////////
    this.emitToAll = function(_message, _data) {
        for (var indexOfPlayer = 0; indexOfPlayer < this.m_data.getNumberOfPlayers(); indexOfPlayer++) 
        {
            this.m_data.players[indexOfPlayer].emit(_message, _data);
        }
        this.m_data.m_hostClient.emit(_message, _data);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn hasEveryPlayerGuessedTricks()
    ///
    /// \brief Checks if every player has guessed the tricks for the current round
    ////////////////////////////////////////////////////////////////////////////////
    this.hasEveryPlayerGuessedTricks = function() {
        var result = false;

        for (var indexOfPlayer = 0; indexOfPlayer < this.m_data.getNumberOfPlayers(); indexOfPlayer++) 
        {
            result = this.m_data.players[indexOfPlayer].m_stats.hashasGuessedTricks();
        }

        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setFirstPlayedSuit()
    ///
    /// \brief Sets the first played suit in a trick turn
    ////////////////////////////////////////////////////////////////////////////////
    this.setFirstPlayedSuit = function(_suit) {
        // -----------------------------------------------------------------------------
        // The first played suit only gets set if the card is not a wizard or fool
        // -----------------------------------------------------------------------------
        if(suit !== 'wizard' && suit !== 'fool') {
            m_firstPlayedSuit = suit;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn createCardDeck()
    ///
    /// \brief Creates the wizard specific card deck
    ////////////////////////////////////////////////////////////////////////////////
    this.createCardDeck = function() {
        this.m_data.cardDeck = new CardDeck();

        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value:  1 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value:  2 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value:  3 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value:  4 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value:  5 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value:  6 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value:  7 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value:  8 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value:  9 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value: 10 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value: 11 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value: 12 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'red', value: 13 }));

        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value:  1 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value:  2 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value:  3 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value:  4 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value:  5 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value:  6 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value:  7 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value:  8 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value:  9 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value: 10 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value: 11 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value: 12 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'blue', value: 13 }));

        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value:  1 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value:  2 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value:  3 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value:  4 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value:  5 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value:  6 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value:  7 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value:  8 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value:  9 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value: 10 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value: 11 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value: 12 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'yellow', value: 13 }));

        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value:  1 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value:  2 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value:  3 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value:  4 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value:  5 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value:  6 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value:  7 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value:  8 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value:  9 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value: 10 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value: 11 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value: 12 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'green', value: 13 }));

        this.m_data.cardDeck.addCard(new Card({ suit: 'wizard', value:  999 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'wizard', value:  999 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'wizard', value:  999 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'wizard', value:  999 }));

        this.m_data.cardDeck.addCard(new Card({ suit: 'fool', value:  0 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'fool', value:  0 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'fool', value:  0 }));
        this.m_data.cardDeck.addCard(new Card({ suit: 'fool', value:  0 }));
    };
}