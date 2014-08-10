////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var GameRoom = require('./gameroom.js');


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
    /// \fn createNewGameRoom(_deck)
    ///
    /// \brief Creates a new game room
    ////////////////////////////////////////////////////////////////////////////////
    this.createNewGameRoom = function (_gameTableClient) {
        // -----------------------------------------------------------------------------
        // TODO: Develop a proper way to generate a unique game id
        // -----------------------------------------------------------------------------
        var gameId = (( Math.random() * 1000 ) | 0).toString();

        // -----------------------------------------------------------------------------
        // Instantiate a new game room and save it to the array
        // -----------------------------------------------------------------------------
        var index = this.m_gameRooms.length;
        this.m_gameRooms[index] = new GameRoom(gameId, _gameTableClient);

        // -----------------------------------------------------------------------------
        // Finally return the game so that other modules can use its id as reference
        // -----------------------------------------------------------------------------
        return this.m_gameRooms[index];
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
            if(this.m_gameRooms[indexOfRoom].m_data.getId() === _id) 
            {
                gameRoom = this.m_gameRooms[indexOfRoom];
                break;
            }

        }

        return gameRoom;
    };
}