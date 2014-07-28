////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = Player;



////////////////////////////////////////////////////////////////////////////////
/// \fn Player(params)
///
/// \brief The data representation of a player
///
/// \param params Should be e.g.: {id: 567, name: 'Thomas'}
////////////////////////////////////////////////////////////////////////////////
function Player (params) {
	// -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error
    // -----------------------------------------------------------------------------
	if (typeof(params.id) === 'undefined') { throw new Error('id parameter in DATA::Player constructor is undefined.'); }
    if (typeof(params.name) === 'undefined') { this.m_name = 'Default'; }

	// -----------------------------------------------------------------------------
    // Private member attributes.
    // -----------------------------------------------------------------------------
	this.m_id   = params.id;
	this.m_name = params.name;


	////////////////////////////////////////////////////////////////////////////////
    /// \fn getId()
    ///
    /// \brief Getter for the players id
    ////////////////////////////////////////////////////////////////////////////////
    this.getId = function() {
    	return this.m_id;
    };
}