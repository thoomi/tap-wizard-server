////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var DATA = DATA || {};
DATA.GameRoom = require('../data/data_gameroom.js');
DATA.GameRoomManager = require('../data/data_gameroom_manager.js');
DATA.Player = require('../data/data_player.js');

var LOGIC = LOGIC || {};
LOGIC.GameRoom = require('./logic_gameroom.js');

var NETWORK = NETWORK || {};
NETWORK.Server = require('../network/net_server.js');

////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = new LogicMain(); 


////////////////////////////////////////////////////////////////////////////////
/// \fn LogicMain()
///
/// \brief Entry point for the logic controller
////////////////////////////////////////////////////////////////////////////////
function LogicMain () {

    // -----------------------------------------------------------------------------
    // m_gameRoomManager => The manager object for the game rooms. It can create and
    // find game rooms.
    // -----------------------------------------------------------------------------
    this.m_gameRoomManager = null;

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onStartup()
    ///
    /// \brief Sets up and initializes the logic
    ////////////////////////////////////////////////////////////////////////////////
    this.onStartup = function() {
        this.m_gameRoomManager = new DATA.GameRoomManager();

        NETWORK.Server.onStartup();
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onRun()
    ///
    /// \brief "main" function of the logic
    ////////////////////////////////////////////////////////////////////////////////
    this.onRun = function() {
        NETWORK.Server.onRun();
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onShutdown()
    ///
    /// \brief Gracefully shutdown of the logic
    ////////////////////////////////////////////////////////////////////////////////
    this.onShutdown = function() {
        NETWORK.Server.onShutdown();
    };



    ////////////////////////////////////////////////////////////////////////////////
    /// The functions below represent the "api" for the real user which is usually
    /// connected through the network. One should be able to "play" the game by
    /// only calling these functions.
    ////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////
        /// \fn openNewGameRoom()
        ///
        /// \brief Creates and opens a new game room
        ////////////////////////////////////////////////////////////////////////////////
        this.openNewGameRoom = function() {
            // -----------------------------------------------------------------------------
            // Create a new data game room and connect it with the game room logic part
            // -----------------------------------------------------------------------------
            var gameRoomData  = this.m_gameRoomManager.createNewGameRoom();
            var gameRoomLogic = new LOGIC.GameRoom();

            gameRoomData.setGameRoomLogic(gameRoomLogic);
            gameRoomLogic.setGameRoomData(gameRoomData);

            // -----------------------------------------------------------------------------
            // Set the game room to waiting for users state
            // -----------------------------------------------------------------------------
            gameRoomData.setState(DATA.GameRoom.States.WAITING);

            // -----------------------------------------------------------------------------
            // TODO: Notify creator that everything has been created. Maybe something like 
            // an emit or done().
            // -----------------------------------------------------------------------------
        };

        ////////////////////////////////////////////////////////////////////////////////
        /// \fn joinGameRoom()
        ///
        /// \brief Manages everything for the player in order to join an existing game
        ////////////////////////////////////////////////////////////////////////////////
        this.joinGameRoom = function(_gameId, _playerName) {
            // -----------------------------------------------------------------------------
            // Check if the game room exists
            // -----------------------------------------------------------------------------
            var gameRoom = this.m_gameRoomManager.getRoomById(_gameId);
            if (gameRoom)
            {
                // -----------------------------------------------------------------------------
                // Generate unique id and create a player
                // -----------------------------------------------------------------------------
                var playerId = ( Math.random() * 1000 ) | 0;
                var player = new DATA.Player({ id: playerId, name: _playerName });

                // -----------------------------------------------------------------------------
                // Add the fresh player to the game room
                // -----------------------------------------------------------------------------
                gameRoom.addPlayer(player);

                // -----------------------------------------------------------------------------
                // TODO: Notify someone or everyone? that a new player joind the game
                // -----------------------------------------------------------------------------
            }
            else 
            {
                // -----------------------------------------------------------------------------
                // TODO: Notify the person who wants to join that the game room does not exist
                // -----------------------------------------------------------------------------
            }
        };

        ////////////////////////////////////////////////////////////////////////////////
        /// \fn prepareGameRoom()
        ///
        /// \brief Prepares an existing game room to start the first round
        ////////////////////////////////////////////////////////////////////////////////
        this.prepareGameRoom = function(_gameId) {
            // -----------------------------------------------------------------------------
            // Check if the game room exists
            // -----------------------------------------------------------------------------
            var gameRoom = this.m_gameRoomManager.getRoomById(_gameId);
            if (gameRoom && gameRoom.getState() === DATA.GameRoom.States.WAITING)
            {
                // -----------------------------------------------------------------------------
                // TODO: Prapare the game room to start the first round.
                // TODO: Notify the users that everything is prepared and the game can be started
                // -----------------------------------------------------------------------------

                // -----------------------------------------------------------------------------
                // Set the game room to running state
                // -----------------------------------------------------------------------------
                gameRoom.setState(DATA.GameRoom.States.RUNNING);
            }
            else
            {
                // -----------------------------------------------------------------------------
                // TODO: Notify / Log that someone wanted to prepare a non existing game
                // -----------------------------------------------------------------------------
            }
        };

        ////////////////////////////////////////////////////////////////////////////////
        /// \fn startNextRound()
        ///
        /// \brief Starts the up coming round of an existing game
        ////////////////////////////////////////////////////////////////////////////////
        this.startNextRound = function() {

        };

        ////////////////////////////////////////////////////////////////////////////////
        /// \fn throwCard()
        ///
        /// \brief A player has thrown a card and it will be handled here
        ////////////////////////////////////////////////////////////////////////////////
        this.throwCard = function() {

        };

        ////////////////////////////////////////////////////////////////////////////////
        /// \fn guessTricks()
        ///
        /// \brief A player guessed tricks for a specific round
        ////////////////////////////////////////////////////////////////////////////////
        this.guessTricks = function() {

        };   
}