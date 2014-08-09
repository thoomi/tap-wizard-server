////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var Client          = require('./game/client.js');
var ClientManager   = require('./game/client_manager.js');
var GamRoomManager  = require('./game/gameroom_manager.js');
var PlayerFactory   = require('./game/player_factory.js');
var SocketIoServer  = require('socket.io');

////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function.
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = GameServer;


////////////////////////////////////////////////////////////////////////////////
/// These events might be shared with the client implementation.
////////////////////////////////////////////////////////////////////////////////
global.events = {
        in: {
            CONNECT:           'connection',
            DISCONNECT:        'disconnect',
            RECONNECT_TO_GAME: 'reconnect_to_game',
            NEW_GAME:          'create_new_game',
            PREPARE_GAME:      'prepare_game',
            START_GAME_ROUND:  'start_game_round',
            JOIN_GAME:         'join_game',
            THROW_CARD:        'throw_card',
            GUESS_TRICKS:      'guess_tricks'
        },
        out: {
            PLAYER_JOINED_GAME:     'player_joined_game',
            NOT_ENOUGH_PLAYERS:     'not_enough_players',
            GAME_STARTS:            'game_starts',
            NEW_ROUND_STARTS:       'new_round_starts',
            NEW_HAND_CARD:          'new_hand_card',
            NEW_TRUMP_CARD:         'new_trump_card',
            PLAYER_IS_DEALER:       'player_is_dealer',
            PLAYER_BEGIN_TURN:      'player_begin_turn',
            PLAYER_GUESSED_TRICKS:  'player_guessed_tricks',
            ALL_TRICKS_GUESSED:     'all_tricks_guessed',
            CARD_NOT_ALLOWED:       'card_not_allowed',
            PLAYER_HAS_THROWN_CARD: 'player_has_thrown_card',
            PLAYER_HAS_WON_TRICK:   'player_has_won_trick',
            ROUND_IS_OVER:          'round_is_over',
            ERROR:                  'error'
        }
};

////////////////////////////////////////////////////////////////////////////////
/// \fn GameServer()
///
/// \brief The representation of the game sever.
////////////////////////////////////////////////////////////////////////////////
function GameServer () {

    this.PORT = 3000;

    this.m_gameRoomManager = null;
    this.m_playerFactory   = null;
    this.m_clientManager   = null;
    this.m_io = null;


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onStartup()
    ///
    /// \brief Sets up and initializes the server.
    ////////////////////////////////////////////////////////////////////////////////
    this.onStartup = function() {
        this.m_gameRoomManager = new GamRoomManager();
        this.m_playerFactory   = new PlayerFactory();
        this.m_clientManager   = new ClientManager();
        this.m_io              = new SocketIoServer();

        this.initializeEventListeners();

        this.m_io.listen(this.PORT);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onShutdown()
    ///
    /// \brief Gracefully shutdown of the server.
    ////////////////////////////////////////////////////////////////////////////////
    this.onShutdown = function() {
        this.m_io.close();
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn initializeEventListeners()
    ///
    /// \brief Sets up all listeners to possible network socket events.
    ////////////////////////////////////////////////////////////////////////////////
    this.initializeEventListeners = function() {
        this.m_io.on(global.events.in.CONNECT, function(_socket) {
            console.info('Socket connected %s', _socket.id);


            ////////////////////////////////////////////////////////////////////////////////
            /// \fn event.in.DISCONNECT
            ///
            /// \brief This event gets fired if the client looses connection.
            ////////////////////////////////////////////////////////////////////////////////
            _socket.on(global.events.in.DISCONNECT, function() {
                console.info('Disconnect event for Socket: %s', this.id);
                var socket = this;

                // -----------------------------------------------------------------------------
                // Look if a client object is associated with the socket.
                // -----------------------------------------------------------------------------
                var client = this.m_clientManager.getClientBySocketId(socket.id);

                if (client)
                {
                    // -----------------------------------------------------------------------------
                    // Check if client is a player.
                    // -----------------------------------------------------------------------------
                    if (client.playerId)
                    {
                        // -----------------------------------------------------------------------------
                        // Get the game room associated with the client.
                        // -----------------------------------------------------------------------------
                        var gameRoom = this.m_gameRoomManager.getRoomById(client.gameRoomId);

                        if (gameRoom.playerLeave(client.playerId))
                        {
                            // -----------------------------------------------------------------------------
                            // Player left room thus remove the client.
                            // -----------------------------------------------------------------------------
                            this.m_clientManager.removeClientBySocketId(socket.id);
                        }
                        else 
                        {
                            // -----------------------------------------------------------------------------
                            // Player is not allowed to leave though only set his client socket to null.
                            // -----------------------------------------------------------------------------
                            client.setSocket(null);
                        }
                    }
                    else 
                    {
                        // -----------------------------------------------------------------------------
                        // Client is a game table. Set the game table socket to null.
                        //
                        // TODO: Develop a way to determine if the host is gone forever and if it is 
                        // necassary to end the game and / or delete the game room. For example:
                        //    - setTimeout() for 30 minutes or something and check if the host socket
                        //      still isn't set.
                        // -----------------------------------------------------------------------------
                        client.setSocket(null);
                    }
                }
            });

            ////////////////////////////////////////////////////////////////////////////////
            /// \fn event.in.RECONNECT_TO_GAME
            ///
            /// \brief This event usually gets fired if a player or game table client 
            /// attempts to reconnect to an existing game
            ///
            /// \params _data.gameRoomId
            /// \params _data.typeOfClient (either "game_table" or "player")
            /// \params [ _data.playerId ] (optional depending on the type of client) 
            ////////////////////////////////////////////////////////////////////////////////
            _socket.on(global.events.in.RECONNECT_TO_GAME, function(_data) {
                console.info('RECONNECT event for Socket: %s', this.id);
                var socket = this;

                // -----------------------------------------------------------------------------
                // Get the requestet game room
                // -----------------------------------------------------------------------------
                var gameRoom = this.m_gameRoomManager.getRoomById(_data.gameRoomId);

                if (gameRoom)
                {
                    if (_data.typeOfClient === Client.Types.GAMETABLE)
                    {
                        var player = gameRoom.m_data.getPlayerById(_data.playerId);
                        if (player)
                        {
                            player.getClient().setSocket(socket);
                        }
                    }
                    else if (_data.typeOfClient === Client.Types.PLAYER)
                    {
                        gameRoom.gameTableClient.setSocket(socket);
                    }
                }
                else
                {
                    socket.emit(global.events.out.ERROR, "The requested game room does not exist.");
                }
            });

            ////////////////////////////////////////////////////////////////////////////////
            /// \fn event.in.NEW_GAME
            ///
            /// \brief This event usually gets fired by the game table client (after clicking 
            /// kind of a "Create game" button)
            ////////////////////////////////////////////////////////////////////////////////
            _socket.on(global.events.in.NEW_GAME, function() {
                console.info('NEW_GAME event for Socket: %s', this.id);
                var socket = this;

                // -----------------------------------------------------------------------------
                // Create a client for the socket which wants to create the game.
                // -----------------------------------------------------------------------------
                var gameTableClient = this.m_clientManager.createNewClient(Client.Types.GAME_TABLE, socket);

                var newGameRoom = this.m_gameRoomManager.createNewGameRoom(gameTableClient);

                // -----------------------------------------------------------------------------
                // Save the game room id also on the client.
                // -----------------------------------------------------------------------------
                gameTableClient.gameRoomId = newGameRoom.m_data.getId();

                // -----------------------------------------------------------------------------
                // Notify the game table that the game has been successfully created.
                // -----------------------------------------------------------------------------
                var data = {
                    gameRoomId: newGameRoom.m_data.getId()
                };
                gameTableClient.emit(global.events.out.NEW_GAME_CREATED, data);
            });
            

            ////////////////////////////////////////////////////////////////////////////////
            /// \fn event.in.PREPARE_GAME
            ///
            /// \brief This event usually gets fired by the game table client if at leat 3 players
            /// have joined the game room and the game should start
            ///
            /// \params _data.gameRoomId
            ////////////////////////////////////////////////////////////////////////////////
            _socket.on(global.events.in.PREPARE_GAME, function(_data) {
                console.info('PREPARE_GAME event for Socket: %s', this.id);
                var socket = this;

                // -----------------------------------------------------------------------------
                // Get game room and prepare for the start of the game
                // -----------------------------------------------------------------------------
                var gameRoom = this.m_gameRoomManager.getRoomById(_data.gameRoomId);

                if (gameRoom)
                {
                    gameRoom.prepareForStart();
                }
                else
                {
                    socket.emit(global.events.out.ERROR, "The requested game room does not exist.");
                }
            });


            ////////////////////////////////////////////////////////////////////////////////
            /// \fn event.in.START_GAME_ROUND
            ///
            /// \brief This event usually gets fired by the game table client after the game room
            /// has been prepared and the first or next round should be played
            ///
            /// \params _data.gameRoomId
            ////////////////////////////////////////////////////////////////////////////////
            _socket.on(global.events.in.START_GAME_ROUND, function(_data) {
                console.info('START_GAME event for Socket: %s', this.id);
                var socket = this;


                var gameRoom = this.m_gameRoomManager.getRoomById(_data.gameRoomId);

                if (gameRoom)
                {
                    gameRoom.startRound();
                }
                else
                {
                    socket.emit(global.events.out.ERROR, "The requested game room does not exist.");
                }
            });


            ////////////////////////////////////////////////////////////////////////////////
            /// \fn event.in.JOIN_GAME
            ///
            /// \brief This event usually gets fired by a client which wants to connect to
            /// an existing game room
            ///
            /// \params _data.gameRoomId, _data.playerName
            /// \params _done An acknowledge callback function 
            ////////////////////////////////////////////////////////////////////////////////
            _socket.on(global.events.in.JOIN_GAME, function(_data, _done) {
                console.info('JOIN_GAME event for Socket: %s', this.id);
                var socket = this;

                // -----------------------------------------------------------------------------
                // Check if the requested game room exists
                // -----------------------------------------------------------------------------
                var gameRoom = this.m_gameRoomManager.getRoomById(_data.gameRoomId);

                if (gameRoom)
                {
                    // -----------------------------------------------------------------------------
                    // Create a new client, player and connect them
                    // -----------------------------------------------------------------------------
                    var newClient = this.m_clientManager.createNewClient(Client.Types.PLAYER, socket);
                    var newPlayer = this.m_playerFactory.createNewPlayerWithName(_data.playerName);

                    newPlayer.setClient(newClient);

                    gameRoom.playerJoin(newPlayer);

                    // -----------------------------------------------------------------------------
                    // Save the game room id and the player id on the client
                    // -----------------------------------------------------------------------------
                    newClient.gameRoomId = gameRoom.getId();
                    newClient.playerId   = newPlayer.getId();

                    // -----------------------------------------------------------------------------
                    // This callback function has been passed in from the client. By calling it
                    // the client will get a confirmation message, that his join attempt endet 
                    // successfully.
                    // -----------------------------------------------------------------------------
                    _done();
                }
                else 
                {
                    socket.emit(global.events.out.ERROR, "The requested game room does not exist.");
                }
            });
            

            ////////////////////////////////////////////////////////////////////////////////
            /// \fn event.in.THROW_CARD
            ///
            /// \brief This event usually gets fired by a player / client as an attempt to
            /// throw a card to the game table (clients automatically get notified from the
            /// game room if their card is not allowed to be played)
            ///
            /// \params _data.gameRoomId, _data.playerId, _data.card
            ////////////////////////////////////////////////////////////////////////////////
            _socket.on(global.events.in.THROW_CARD, function(_data) {
                console.info('THROW_CARD event for Socket: %s', this.id);
                var socket = this;

                
                var gameRoom = this.m_gameRoomManager.getRoomById(_data.gameRoomId);

                if (gameRoom)
                {
                    gameRoom.playerThrowCard(_data.playerId, _data.card);
                }
                else
                {
                    socket.emit(global.events.out.ERROR, "The requested game room does not exist.");
                }
            });


            ////////////////////////////////////////////////////////////////////////////////
            /// \fn event.in.GUESS_TRICKS
            ///
            /// \brief This event usually gets fired by a player / client in order to guess
            /// the tricks for the current round in the game room.
            ///
            /// \params _data.gameRoomId
            ////////////////////////////////////////////////////////////////////////////////
            _socket.on(global.events.in.GUESS_TRICKS, function(_data) {
                console.info('GUESS_TRICKS event for Socket: %s', this.id);
                var socket = this;

                
                var gameRoom = this.m_gameRoomManager.getRoomById(_data.gameRoomId);

                if (gameRoom)
                {
                    gameRoom.playerGuessedTricks(_data.playerId, _data.numberOfGuessedTricks);
                }
                else
                {
                    socket.emit(global.events.out.ERROR, "The requested game room does not exist.");
                }
            });
        });
    };
}