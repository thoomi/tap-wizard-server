////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = Card;


////////////////////////////////////////////////////////////////////////////////
/// \fn Card(params)
///
/// \brief The data representation of a card
///
/// \param params Should be e.g.: {suit: 'blue', value: 1}
////////////////////////////////////////////////////////////////////////////////
function Card (params){
	// -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error
    // -----------------------------------------------------------------------------
	if (typeof(params.suit) === 'undefined') { throw new Error('suit parameter in DATA::Card constructor is undefined.'); }
    if (typeof(params.value) === 'undefined') { throw new Error('value parameter in DATA::Card constructor is undefined.'); }

	// -----------------------------------------------------------------------------
    // Public member attributes.
    // -----------------------------------------------------------------------------
	this.suit  = params.suit;
	this.value = params.value;
}