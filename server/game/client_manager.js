////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var Client = require('./client.js');


////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = ClientManager;

function ClientManager () {
    // -----------------------------------------------------------------------------
    // All clients are stored here
    // -----------------------------------------------------------------------------
    this.m_clients = [];


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn createNewClient()
    ///
    /// \brief Creates a new network client
    ///
    /// \params _type The type of the client
    /// \params _socket The socket io object connected with the client
    ////////////////////////////////////////////////////////////////////////////////
    this.createNewClient = function (_type, _socket) {
        // -----------------------------------------------------------------------------
        // Instantiate a new client
        // -----------------------------------------------------------------------------
        var index = this.m_clients.length;
        this.m_clients[index] = new Client(_type, _socket);

        // -----------------------------------------------------------------------------
        // Finally return the client so that other modules can use it
        // -----------------------------------------------------------------------------
        return this.m_clients[index];
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn removeClientBySocketId()
    ///
    /// \brief Removes a client from the manager
    ///
    /// \params _socketId
    ////////////////////////////////////////////////////////////////////////////////
    this.removeClientBySocketId = function (_socketId) {
        for (var indexOfClient = 0; indexOfClient < this.m_clients.length; indexOfClient++) 
        {
            var socket = this.m_clients[indexOfClient].getSocket();

            if (socket && socket.id === _socketId)
            {
                this.m_clients.splice(indexOfClient, 1);
            }
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getClientBySocketId(_socketId)
    ///
    /// \brief Looks up the a client based on a socket id
    ///
    /// \param _socketId 
    /// \return The found client otherwise null
    ////////////////////////////////////////////////////////////////////////////////
    this.getClientBySocketId = function (_socketId) {
        var resultClient = null;

        for (var indexOfClient = 0; indexOfClient < this.m_clients.length; indexOfClient++) 
        {
            var socket = this.m_clients[indexOfClient].getSocket();

            if (socket && socket.id === _socketId)
            {
                resultClient = this.m_clients[indexOfClient];
                break;
            }
        }

        return resultClient;
    };
}