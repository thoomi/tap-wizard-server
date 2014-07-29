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
function Client (_id) {
    // -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error.
    // -----------------------------------------------------------------------------
    if (typeof(_id) === 'undefined') { throw new Error('_id parameter in Net::Client constructor is undefined.'); }

	// -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
	this.m_id    = _id;
	this.m_state = NetworkState.OFFLINE;
}