////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = Client;


////////////////////////////////////////////////////////////////////////////////
/// \fn Client()
///
/// \brief The networking component of the client
////////////////////////////////////////////////////////////////////////////////
function Client (_socket) {
    // -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error.
    // -----------------------------------------------------------------------------
    if (typeof(_socket) === 'undefined') { throw new Error('_socket parameter in Net::Client constructor is undefined.'); }

	// -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
    this.m_socket = _socket;

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
        return this.m_id;
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
            console.log('Clients socket is not set.');
        }
    };
}