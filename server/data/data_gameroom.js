////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var DATA    = DATA || {};
DATA.config = require('./data_player_manager.js');


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
    DEFAULT : 'default',
    WAITING : 'waiting',
    RUNNING : 'running',
    OVER    : 'over'
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
	this.m_cardsOnTable  = [];
    this.m_gameRoomLogic = null;
    this.m_currentState  = this.States.DEFAULT;

    // -----------------------------------------------------------------------------
    // m_playerManager => The object which manages the players for the game room.
    // It provides the functionality to add, remove and find players.
    // -----------------------------------------------------------------------------
	this.m_playerManager = new DATA.PlayerManager();


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
}