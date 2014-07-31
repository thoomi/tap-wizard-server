////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var DATA         = DATA || {};
DATA.PlayerStats = require('./data_player_manager.js');

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
function Player (_params) {
	// -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error
    // -----------------------------------------------------------------------------
	if (typeof(_params.id) === 'undefined') { throw new Error('id parameter in DATA::Player constructor is undefined.'); }
    if (typeof(_params.name) === 'undefined') { this.m_name = 'Default'; }

	// -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
	this.m_id    = _params.id;
	this.m_name  = _params.name;

    // -----------------------------------------------------------------------------
    // stats => The object which manages all player specific stats like tricks per
    // round, guessed tricks, etc...
    // -----------------------------------------------------------------------------
    this.m_stats = new DATA.PlayerStats(); 

    // -----------------------------------------------------------------------------
    // setOfCards[] => The current set of cards which the "real" player has on its 
    // hands. The player has the possibility to play out these cards. 
    // -----------------------------------------------------------------------------
    this.m_setOfCards = [];


	////////////////////////////////////////////////////////////////////////////////
    /// \fn getId()
    ///
    /// \brief Getter for the players id
    ////////////////////////////////////////////////////////////////////////////////
    this.getId = function() {
    	return this.m_id;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getId()
    ///
    /// \brief Getter for the players name
    ////////////////////////////////////////////////////////////////////////////////
    this.getName = function() {
        return this.m_name;
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn addCard()
    ///
    /// \brief Adds a card to the set of playable hand cards
    ///
    /// \param _card The card to add
    ////////////////////////////////////////////////////////////////////////////////
    this.addCard = function(_card) {
        this.m_setOfCards.push(_card);
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn removeCard()
    ///
    /// \brief Removes a card from the playable hand card set
    ///
    /// \param _card The card to remove
    ////////////////////////////////////////////////////////////////////////////////
    this.removeCard = function(_card) {
        for (var indexOfCard = 0; indexOfCard < this.m_setOfCards.length; indexOfCard++) 
        {   
            // -----------------------------------------------------------------------------
            // Check if color and value match.
            // -----------------------------------------------------------------------------
            if(this.m_setOfCards[indexOfCard].color === _card.color && this.m_setOfCards[indexOfCard].value === _card.value) 
            {
                this.m_setOfCards.splice(indexOfCard, 1);
            }
        }
    };
}