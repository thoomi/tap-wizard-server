////////////////////////////////////////////////////////////////////////////////
/// Set a globally available EventBus object
/// This object provides a way for the modules to communicate with each other
////////////////////////////////////////////////////////////////////////////////
var EventBus = require('./core/core_eventbus.js');
global.EventBus = new EventBus();


////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var GamRoomManager  = require('./game/gameroom_manager.js');
var SocketIoServer  = require('socket.io');


////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = GameServer; 


////////////////////////////////////////////////////////////////////////////////
/// These events might be shared with the client implementation
////////////////////////////////////////////////////////////////////////////////
global.events = {
        in: {
            CONNECT:      'connection',
            DISCONNECT:   'disconnect',
            NEW_GAME:     'create_new_game',
            PREPARE_GAME: 'prepare_game',
            START_GAME:   'start_game',
            JOIN_GAME:    'join_game',
            THROW_CARD:   'throw_card',
            GUESS_TRICKS: 'guess_tricks'
        },
        out: {
            GAME_STARTS:            'game_starts',
            NEW_HAND_CARD:          'new_hand_card',
            NEW_TRUMP_CARD:         'new_trump_card',
            PLAYER_IS_DEALER:       'player_is_dealer',
            PLAYER_BEGIN_TURN:      'player_begin_turn',
            PLAYER_GUESSED_TRICKS:  'player_guessed_tricks',
            ALL_TRICKS_GUESSED:     'all_tricks_guessed',
            CARD_NOT_ALLOWED:       'card_not_allowed',
            PLAYER_HAS_THROWN_CARD: 'player_has_thrown_card',
            PLAYER_HAS_WON_TRICK:   'player_has_won_trick',
            ROUND_IS_OVER:          'round_is_over'
        }
};

////////////////////////////////////////////////////////////////////////////////
/// \fn GameServer()
///
/// \brief The representation of the game sever
////////////////////////////////////////////////////////////////////////////////
function GameServer () {

    this.PORT = 3000;

    this.m_gameRoomManager = null;
    this.m_io = null;


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onStartup()
    ///
    /// \brief Sets up and initializes the server
    ////////////////////////////////////////////////////////////////////////////////
    this.onStartup = function() {
        this.m_gameRoomManager = new GamRoomManager();
        this.m_io = new SocketIoServer();

        this.initializeEventListeners();

        this.m_io.listen(this.PORT);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onShutdown()
    ///
    /// \brief Gracefully shutdown of the server
    ////////////////////////////////////////////////////////////////////////////////
    this.onShutdown = function() {
        this.m_io.close();
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn initializeEventListeners()
    ///
    /// \brief Sets up all listeners to possible network socket events
    ////////////////////////////////////////////////////////////////////////////////
    this.initializeEventListeners = function() {
        this.m_io.on(global.events.in.CONNECT, function(_socket) {
            console.info('Connect event for Socket: %s', _socket.id);

            _socket.on(global.events.in.DISCONNECT, function() {
                console.info('Disconnect event for Socket: %s', this.id);
            });

            _socket.on(global.events.in.NEW_GAME, function() {
                console.info('NEW_GAME event for Socket: %s', this.id);
            });

            _socket.on(global.events.in.PREPARE_GAME, function() {
                console.info('PREPARE_GAME event for Socket: %s', this.id);
            });

            _socket.on(global.events.in.START_GAME, function() {
                console.info('START_GAME event for Socket: %s', this.id);
            });

            _socket.on(global.events.in.JOIN_GAME, function() {
                console.info('JOIN_GAME event for Socket: %s', this.id);
            });

            _socket.on(global.events.in.THROW_CARD, function() {
                console.info('THROW_CARD event for Socket: %s', this.id);
            });

            _socket.on(global.events.in.GUESS_TRICKS, function() {
                console.info('GUESS_TRICKS event for Socket: %s', this.id);
            });
        });
    };
}