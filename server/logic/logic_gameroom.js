////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var DATA = {};
DATA.config = require('../data/data_config.js');
DATA.GameRoom = require('../data/data_gameroom.js');
DATA.Card = require('../data/data_card');

////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = GameRoom;


function GameRoom () {
    // -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
    this.m_gameRoomData = null;

    this.m_maxRounds = 0;
    this.m_currentRound = 0;

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setGameRoomData()
    ///
    /// \brief Set the game room data object
    ////////////////////////////////////////////////////////////////////////////////
    this.setGameRoomData = function(_gameRoomData) {
        this.m_gameRoomData = _gameRoomData;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn playerJoinGame()
    ///
    /// \brief Add player to game room
    ////////////////////////////////////////////////////////////////////////////////
    this.playerJoin = function(_player) {
        this.m_gameRoomData.addPlayer(_player);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn playerLeaveGame()
    ///
    /// \brief Remove player from game room
    ////////////////////////////////////////////////////////////////////////////////
    this.playerLeave = function(_playerId) {
        this.m_gameRoomData.removePlayerById(_playerId);
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
    /// \fn startNewRound()
    ///
    /// \brief Starts a new round by dealing cards etc..
    ////////////////////////////////////////////////////////////////////////////////
    this.startRound = function() {
        // -----------------------------------------------------------------------------
        // Reset card deck, shuffle and deal the cards
        // -----------------------------------------------------------------------------
        this.m_gameRoomData.cardDeck.reset();

        this.m_gameRoomData.cardDeck.shuffle();

        this.dealCards();

        // -----------------------------------------------------------------------------
        // Choose a trump card for the round 
        // -----------------------------------------------------------------------------
        if (!this.isLastRound())
        {
            this.m_trumpCard = this.m_currentRound.cardDeck.getCard();
        }

        // -----------------------------------------------------------------------------
        // Initialize new round for each player
        // -----------------------------------------------------------------------------
        this.m_gameRoomData.forEachPlayer(function(_player) {
            _player.initializeNewRound(this.m_currentRound);
        });
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn dealCards()
    ///
    /// \brief Deal the cards
    ////////////////////////////////////////////////////////////////////////////////
    this.dealCards = function() {
        // -----------------------------------------------------------------------------
        // One need to define the forEach callback function outside of the for loop due
        // to jshint's warning. This function gets called for each player in the loop 
        // below.
        // -----------------------------------------------------------------------------
        /*function addCardToPlayer(_player) {
            _player.addCard(this.m_gameRoomData.cardDeck.getCard());
        }*/

        // -----------------------------------------------------------------------------
        // Loop through the number of rounds and through each player per round.
        // -----------------------------------------------------------------------------
        for (var indexOfRound = 0; indexOfRound < this.m_currentRound; indexOfRound++)
        {
            
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn playerGuessedTricks()
    ///
    /// \brief Starts a new round by dealing cards etc..
    ////////////////////////////////////////////////////////////////////////////////
    this.playerGuessedTricks = function(_playerId, _numberOfGuessedTricks) {
        // -----------------------------------------------------------------------------
        // Get the player and and set the guessed tricks
        // ----------------------------------------------------------------------------
        var player = this.m_gameRoomData.getPlayerById(_playerId);
        player.m_playerLogic.setGuessedTricks(_numberOfGuessedTricks);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn prepareForStart()
    ///
    /// \brief Prepares the game room to be ready for starting
    ////////////////////////////////////////////////////////////////////////////////
    this.prepareForStart = function() {
        // -----------------------------------------------------------------------------
        // Create the card deck
        // -----------------------------------------------------------------------------
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  1 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  2 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  3 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  4 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  5 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  6 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  7 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  8 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  9 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value: 10 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value: 11 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value: 12 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value: 13 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  1 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  2 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  3 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  4 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  5 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  6 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  7 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  8 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  9 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value: 10 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value: 11 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value: 12 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value: 13 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  1 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  2 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  3 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  4 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  5 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  6 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  7 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  8 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  9 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value: 10 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value: 11 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value: 12 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value: 13 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  1 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  2 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  3 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  4 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  5 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  6 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  7 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  8 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  9 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value: 10 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value: 11 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value: 12 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value: 13 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'wizard', value:  999 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'wizard', value:  999 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'wizard', value:  999 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'wizard', value:  999 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'fool', value:  0 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'fool', value:  0 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'fool', value:  0 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'fool', value:  0 }));

        // -----------------------------------------------------------------------------
        // Calculate the number of possible rounds
        // -----------------------------------------------------------------------------
        var numberOfCards   = this.m_gameRoomData.cardDeck.getNumberOfCards();
        var numberOfPlayers = this.m_gameRoomData.getNumberOfPlayers();

        this.m_maxRounds = Math.ceil(numberOfCards / numberOfPlayers);  

        // -----------------------------------------------------------------------------
        // Set the game state to ready for a new round
        // -----------------------------------------------------------------------------        
        this.m_gameRoomData.setState(DATA.GameRoom.States.READY_FOR_NEW_ROUND);
    };



}