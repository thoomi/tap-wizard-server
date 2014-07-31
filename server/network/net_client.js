////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = Client;


var NetworkState = {
	ONLINE  : 'online',
	OFFLINE : 'offline'
};

////////////////////////////////////////////////////////////////////////////////
/// \fn Client()
///
/// \brief The networking component of the client
////////////////////////////////////////////////////////////////////////////////
function Client (_socketId) {
    // -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error.
    // -----------------------------------------------------------------------------
    if (typeof(_socketId) === 'undefined') { throw new Error('_socketId parameter in Net::Client constructor is undefined.'); }

	// -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
    this.m_playerId = 0;
    this.m_socketId = _socketId;
	this.m_state    = NetworkState.OFFLINE;


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setPlayerId()
    ///
    /// \brief Set the players id in the game
    ////////////////////////////////////////////////////////////////////////////////
    this.setPlayerId = function(_id) {
        this.m_playerId = _id;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getPlayerId()
    ///
    /// \brief Getter for the players id
    ////////////////////////////////////////////////////////////////////////////////
    this.getPlayerId = function() {
        return this.m_id;
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setPlayerId()
    ///
    /// \brief Set the players id in the game
    ////////////////////////////////////////////////////////////////////////////////
    this.setSocketId = function(_id) {
        this.m_socketId = _id;
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getPlayerId()
    ///
    /// \brief Getter for the players id
    ////////////////////////////////////////////////////////////////////////////////
    this.getSocketId = function() {
        return this.m_id;
    };
}