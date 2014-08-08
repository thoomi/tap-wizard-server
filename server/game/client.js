////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = Client;

////////////////////////////////////////////////////////////////////////////////
/// Type of clients (currently only needed for the reconnect to game event)
////////////////////////////////////////////////////////////////////////////////
Client.Types = {
    GAME_TABLE : 'game_table',
    PLAYER     : 'player'
};


////////////////////////////////////////////////////////////////////////////////
/// \fn Client()
///
/// \brief The networking component of the client
////////////////////////////////////////////////////////////////////////////////
function Client (_type, _socket) {
    // -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error.
    // -----------------------------------------------------------------------------
    if (typeof(_socket) === 'undefined') { throw new Error('_socket parameter in Net::Client constructor is undefined.'); }
    if (typeof(_type) === 'undefined') { throw new Error('_type parameter in Net::Client constructor is undefined.'); }
	// -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
    this.m_socket = _socket;
    this.m_type   = _type;

    // -----------------------------------------------------------------------------
    // TODO: Implement the use of this message queue. 
    //   - Add items if no socket is set
    //   - Remove / emit items as soon as a new socket is set
    // -----------------------------------------------------------------------------
    this.m_messageQueue = [];

    // -----------------------------------------------------------------------------
    // These attributes are defined to be accesible from "outside" for easing the
    // development process. Furthermore they are needed in order to determine if 
    // the client is already in a game room or belongs already to a player.
    // -----------------------------------------------------------------------------
    this.gameRoomId = null;
    this.playerId   = null;

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setSocket()
    ///
    /// \brief Set the socket
    ////////////////////////////////////////////////////////////////////////////////
    this.setSocket = function(_socket) {
        this.m_socket = _socket;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getSocket()
    ///
    /// \brief Getter for the socket object
    ////////////////////////////////////////////////////////////////////////////////
    this.getSocket = function() {
        return this.m_socket;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getType()
    ///
    /// \brief Getter for the client's type
    ////////////////////////////////////////////////////////////////////////////////
    this.getSocket = function() {
        return this.m_type;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn emit()
    ///
    /// \brief Sends data to the remote client over the socket
    ////////////////////////////////////////////////////////////////////////////////
    this.emit = function (_message, _data) {
        if (this.m_socket) 
        {
            this.m_socket.emit(_message, _data);
        }
        else 
        {
            console.log('Client socket is not set.');
        }
    };
}