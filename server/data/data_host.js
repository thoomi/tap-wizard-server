////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = Host;



////////////////////////////////////////////////////////////////////////////////
/// \fn Host(params)
///
/// \brief The data representation of a Host
///
/// \param params Should be e.g.: {id: 567}
////////////////////////////////////////////////////////////////////////////////
function Host (params) {
	// -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error
    // -----------------------------------------------------------------------------
	if (typeof(params.id) === 'undefined') { throw new Error('id parameter in DATA::Host constructor is undefined.'); }

	// -----------------------------------------------------------------------------
    // Private member attributes.
    // -----------------------------------------------------------------------------
	this.m_id = params.id;


	////////////////////////////////////////////////////////////////////////////////
    /// \fn getId()
    ///
    /// \brief Getter for the host id
    ////////////////////////////////////////////////////////////////////////////////
    this.getId = function() {
    	return this.m_id;
    };
}