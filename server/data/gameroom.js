////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var DATA           = DATA || {};
DATA.PlayerManager = require('./data_player_manager.js');
DATA.CardDeck = require('./data_carddeck.js');


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
    UNKNOWN               : 'unknown',
    WAITING_FOR_PLAYERS   : 'waiting_for_players',
    READY_FOR_NEW_ROUND   : 'ready_for_new_round',
    READY_TO_START        : 'ready_to_start',
    READY_TO_GUESS_TRICKS : 'redy_to_guess_tricks',
    READY_TO_THROW_CARDS  : 'ready_to_THROW_CARDS',
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
    this.m_id            = _gameId;
    this.cardDeck      = new DATA.CardDeck();
	this.m_cardsOnTable  = [];
    this.m_gameRoomLogic = null;
    this.m_currentState  = GameRoom.States.UNKNOWN;

    // -----------------------------------------------------------------------------
    // m_players => The object which manages the players for the game room.
    // It provides the functionality to add, remove and find players.
    // -----------------------------------------------------------------------------
	this.m_players = [];


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getId()
    ///
    /// \brief Getter for the game rooms id
    ////////////////////////////////////////////////////////////////////////////////
    this.getId = function() {
        return this.m_id;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setPlayerId()
    ///
    /// \brief Set the players id in the game
    ////////////////////////////////////////////////////////////////////////////////
    this.setGameRoomLogic = function(_gameRoomLogic) {
        this.m_gameRoomLogic = _gameRoomLogic;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setState()
    ///
    /// \brief Set the players id in the game
    ////////////////////////////////////////////////////////////////////////////////
    this.setState = function(_state) {
        this.m_currentState = _state;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getState()
    ///
    /// \brief Getter for the players id
    ////////////////////////////////////////////////////////////////////////////////
    this.getState = function() {
        return this.m_currentState;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn addPlayer(_player)
    ///
    /// \brief Adds a player 
    ///
    /// \param _player The player instance to add
    ////////////////////////////////////////////////////////////////////////////////
    this.addPlayer = function (_player) {
        this.m_players.push(_player);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getNumberOfPlayers()
    ///
    /// \brief Returns the current number of players
    ////////////////////////////////////////////////////////////////////////////////
    this.getNumberOfPlayers = function () {
        return this.m_players.length;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn removePlayerById(_id)
    ///
    /// \brief Removes a player 
    ///
    /// \param _id The id of the player which should be removed
    ////////////////////////////////////////////////////////////////////////////////
    this.removePlayerById = function (_id) {
        for (var indexOfPlayer = 0; indexOfPlayer < this.m_players.length; indexOfPlayer++) 
        {
            if(this.m_players[indexOfPlayer].getId() === _id) 
            {
                this.m_players.splice(indexOfPlayer, 1);
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

        for (var indexOfPlayer = 0; indexOfPlayer < this.m_players.length; indexOfPlayer++) 
        {
            if(this.m_players[indexOfPlayer].getId() === _id) 
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
            player = this.m_players[indexOfPlayer];
        }

        return player;
    };

    this.forEachPlayer = function (_callback) {
        this.m_players.forEach(_callback);
    };
}