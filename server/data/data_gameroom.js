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
}