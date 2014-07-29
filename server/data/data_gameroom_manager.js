////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var DATA = DATA || {};
DATA.GameRoom = require('./data_gameroom.js');


////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = GameRoomManager;


function GameRoomManager () {
    // -----------------------------------------------------------------------------
    // All game rooms saved here in an assoziative array and are available through
    // their game id as the key
    // -----------------------------------------------------------------------------
    this.m_gameRooms = [];


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setCardDeck(_deck)
    ///
    /// \brief Sets the card deck
    ///
    /// \param _deck The 
    ////////////////////////////////////////////////////////////////////////////////
    this.createNewGameRoom = function () {
        // -----------------------------------------------------------------------------
        // TODO: Develop a proper way to generate a unique game id
        // -----------------------------------------------------------------------------
        var gameId = ( Math.random() * 100 ) | 0;

        // -----------------------------------------------------------------------------
        // Instantiate a new game room and save it to the array with its id as key
        // -----------------------------------------------------------------------------
        this.m_gameRooms[gameId] = new DATA.GameRoom(gameId);

        // -----------------------------------------------------------------------------
        // Finally return the game id, so that other modules can use it as identifier
        // -----------------------------------------------------------------------------
        return gameId;
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getRoomById(_id)
    ///
    /// \brief Looks up the room for the given id
    ///
    /// \param _id The id of the room to look for
    /// \return The constructor instance of the game room (null if no room was found)
    ////////////////////////////////////////////////////////////////////////////////
    this.getRoomById = function (_id) {
        var gameRoom = null;

        for (var indexOfRoom = 0; indexOfRoom < this.m_gameRooms.length; indexOfRoom++) 
        {
            if(this.m_gameRooms[indexOfRoom].getId() === _id) 
            {
                gameRoom = this.m_gameRooms[indexOfRoom];
                break;
            }
        }

        return gameRoom;
    };
}