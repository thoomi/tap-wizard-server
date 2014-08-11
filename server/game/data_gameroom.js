////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = GameRoom;


////////////////////////////////////////////////////////////////////////////////
/// Game room states as static constructor members
////////////////////////////////////////////////////////////////////////////////
GameRoom.States = {
    WAITING_FOR_PLAYERS   : 'waiting_for_players',
    READY_FOR_NEW_ROUND   : 'ready_for_new_round',
    READY_TO_START        : 'ready_to_start',
    READY_TO_GUESS_TRICKS : 'redy_to_guess_tricks',
    READY_TO_THROW_CARDS  : 'ready_to_throw_cards',
    GAME_OVER             : 'game_over'
};


function GameRoom (_gameId) {
    // -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error.
    // -----------------------------------------------------------------------------
    if (typeof(_gameId) === 'undefined') { throw new Error('_gameId parameter in DATA::GameTable constructor is undefined.'); }

    // -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
    this.id            = _gameId;
    this.cardDeck      = null;
	this.cardsOnTable  = [];
    this.currentState  = GameRoom.States.WAITING_FOR_PLAYERS;

    // -----------------------------------------------------------------------------
    // players => The object which manages the players for the game room.
    // It provides the functionality to add, remove and find players.
    // -----------------------------------------------------------------------------
	this.players = [];


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getId()
    ///
    /// \brief Getter for the game rooms id
    ////////////////////////////////////////////////////////////////////////////////
    this.getId = function() {
        return this.id;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setState()
    ///
    /// \brief Set game room state
    ////////////////////////////////////////////////////////////////////////////////
    this.setState = function(_state) {
        this.currentState = _state;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getState()
    ///
    /// \brief Getter for the game room state
    ////////////////////////////////////////////////////////////////////////////////
    this.getState = function() {
        return this.currentState;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn addPlayer(_player)
    ///
    /// \brief Adds a player 
    ///
    /// \param _player The player instance to add
    ////////////////////////////////////////////////////////////////////////////////
    this.addPlayer = function (_player) {
        this.players.push(_player);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getNumberOfPlayers()
    ///
    /// \brief Returns the current number of players
    ////////////////////////////////////////////////////////////////////////////////
    this.getNumberOfPlayers = function () {
        return this.players.length;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getNumberOfCardsOnTable()
    ///
    /// \brief Returns the current number of played cards
    ////////////////////////////////////////////////////////////////////////////////
    this.getNumberOfCardsOnTable = function () {
        return this.cardsOnTable.length;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn removePlayerById(_id)
    ///
    /// \brief Removes a player 
    ///
    /// \param _id The id of the player which should be removed
    ////////////////////////////////////////////////////////////////////////////////
    this.removePlayerById = function (_id) {
        for (var indexOfPlayer = 0; indexOfPlayer < this.players.length; indexOfPlayer++) 
        {
            if(this.players[indexOfPlayer].getId() === _id) 
            {
                this.players.splice(indexOfPlayer, 1);
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getIndexOfPlayerById(_id)
    ///
    /// \brief Looks up the index of a player by a given id
    ///
    /// \param _id The id of the player to look for
    /// \return the index of the player (-1 if not player has been found)
    ////////////////////////////////////////////////////////////////////////////////
    this.getIndexOfPlayerById = function (_id) {
        var resultPlayerIndex = -1;

        for (var indexOfPlayer = 0; indexOfPlayer < this.players.length; indexOfPlayer++) 
        {
            if(this.players[indexOfPlayer].getId() === _id) 
            {
                resultPlayerIndex = indexOfPlayer;
                break;
            }
        }

        return resultPlayerIndex;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getPlayerById(_id)
    ///
    /// \brief Looks up a player by a given id
    ///
    /// \param _id The id of the player to look for
    /// \return the constructor instance of the player (if not found null)
    ////////////////////////////////////////////////////////////////////////////////
    this.getPlayerById = function (_id) {
        var player = null;
        var indexOfPlayer = this.getIndexOfPlayerById(_id);

        if (indexOfPlayer !== -1)
        {
            player = this.players[indexOfPlayer];
        }

        return player;
    };
}