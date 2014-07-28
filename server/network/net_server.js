////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var SocketServer = require('socket.io');


////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = Server; 


var NetworkEvent = {
    CONNECT    : 'connection',
    DISCONNECT : 'disconnect',

};


////////////////////////////////////////////////////////////////////////////////
/// \fn Server()
///
/// \brief The networking component of the server
////////////////////////////////////////////////////////////////////////////////
function Server () {
	// -----------------------------------------------------------------------------
    // Private member attributes.
    // -----------------------------------------------------------------------------
    this.m_io      = null;
	this.m_clients = [];


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setup()
    ///
    /// \brief Sets up and initializes the server
    ////////////////////////////////////////////////////////////////////////////////
    this.setup = function() {
        this.m_io = new SocketServer();
    };

    this.setupListeners = function () {
        this.m_io.on(NetworkEvent.CONNECT, function(socket) {
            console.log(socket);
        });

        this.m_io.on(NetworkEvent.DISCONNECT, function(socket) {
            console.log(socket);
        });
    };
}