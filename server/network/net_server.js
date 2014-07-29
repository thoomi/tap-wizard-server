////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var DATA    = DATA || {};
DATA.config = require('../data/data_config.js');

var CORE  = CORE || {};
CORE.util = require('../core/core_util.js');


////////////////////////////////////////////////////////////////////////////////
/// Third party namespace and dependencies
////////////////////////////////////////////////////////////////////////////////
var THIRD          = THIRD || {};
THIRD.events       = require('events');
THIRD.SocketServer = require('socket.io');


////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = new Server();


////////////////////////////////////////////////////////////////////////////////
/// Inherit the event emitter functionality
////////////////////////////////////////////////////////////////////////////////
CORE.util.inherits(Server, THIRD.events.EventEmitter);


////////////////////////////////////////////////////////////////////////////////
/// Collection of events that can be fired through the network api
////////////////////////////////////////////////////////////////////////////////
var NetworkEvent = {
    CONNECT    : 'connection',
    DISCONNECT : 'disconnect'
};


////////////////////////////////////////////////////////////////////////////////
/// \fn Server()
///
/// \brief The networking component of the server
////////////////////////////////////////////////////////////////////////////////
function Server () {

    this.m_io      = null;
	this.m_clients = [];


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onStartup()
    ///
    /// \brief Sets up and initializes the server
    ////////////////////////////////////////////////////////////////////////////////
    this.onStartup = function() {
        // -----------------------------------------------------------------------------
        // Create a new socket io server instance.
        // -----------------------------------------------------------------------------
        this.m_io = new THIRD.SocketServer();

        // -----------------------------------------------------------------------------
        // Setup all network event listeners. If a new network message arrives one of
        // these listeners gets triggerd.
        // -----------------------------------------------------------------------------
        this.setupListeners();
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onRun()
    ///
    /// \brief "main" function of the server
    ////////////////////////////////////////////////////////////////////////////////
    this.onRun = function() {
        // -----------------------------------------------------------------------------
        // Keep the socket server up and have it listening on a specific port.
        // -----------------------------------------------------------------------------
        this.m_io.listen(DATA.config.network.port);
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn onShutdown()
    ///
    /// \brief Gracefully shutdown of the network connections
    ////////////////////////////////////////////////////////////////////////////////
    this.onShutdown = function() {
        // -----------------------------------------------------------------------------
        // Close the listening socket server
        // -----------------------------------------------------------------------------
        this.m_io.close();
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setupListeners()
    ///
    /// \brief Initializes all listeners for accepted network events
    ////////////////////////////////////////////////////////////////////////////////
    this.setupListeners = function () {
        this.m_io.on(NetworkEvent.CONNECT, function(_socket) {
            console.info('Connect event for Socket: %s', _socket.id);


            _socket.on(NetworkEvent.DISCONNECT, function() {
                console.info('Disconnect event for Socket: %s', this.id);
            });
        });
    };
}