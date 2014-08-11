////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var PlayerStats = require('./data_player_stats.js');

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
    // this.m_hasPlayedCardInTurn => The game logic needs this variable in order
    // to check if a player already made the move for a turn.
    // -----------------------------------------------------------------------------
    this.m_hasPlayedCardInTurn = false;

    // -----------------------------------------------------------------------------
    // this.m_client => The network client representation. We need this to send data
    // to the client if for example a card is added to the player.
    // -----------------------------------------------------------------------------
    this.m_client = null;

    // -----------------------------------------------------------------------------
    // m_setOfCards[] => The current set of cards which the "real" player has on its 
    // hands. The player has the possibility to play out these cards. 
    // -----------------------------------------------------------------------------
    this.m_setOfCards = [];

    // -----------------------------------------------------------------------------
    // m_stats => This object manages the stats per round for the player
    // -----------------------------------------------------------------------------
    this.m_stats = new PlayerStats();



	////////////////////////////////////////////////////////////////////////////////
    /// \fn getId()
    ///
    /// \brief Getter for the players id
    ////////////////////////////////////////////////////////////////////////////////
    this.getId = function() {
    	return this.m_id;
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setClient()
    ///
    /// \brief Sets the network client of the player
    ///
    /// \param _client the network client
    ////////////////////////////////////////////////////////////////////////////////
    this.setClient = function(_client) {
        this.m_client = _client;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getClient()
    ///
    /// \brief Returns the network client of the player
    ////////////////////////////////////////////////////////////////////////////////
    this.getClient = function() {
        return this.m_client;
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
        _card.playerId = this.m_id;
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
            // Check if suit and value match.
            // -----------------------------------------------------------------------------
            if(this.m_setOfCards[indexOfCard].suit === _card.suit && this.m_setOfCards[indexOfCard].value === _card.value) 
            {
                this.m_setOfCards.splice(indexOfCard, 1);
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn hasCardWithSuit()
    ///
    /// \brief Looks if the player has a card with a specific suit in his hand deck
    ///
    /// \param _suit the card suit to look for
    ////////////////////////////////////////////////////////////////////////////////
    this.hasCardWithSuit = function(_suit) {
        for (var indexOfCard = 0; indexOfCard < this.m_setOfCards.length; indexOfCard++) 
        {
            if (this.m_setOfCards[indexOfCard].suit === _suit) 
            {
                return true;
            }
        }
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn emit(_message, _data)
    ///
    /// \brief Emits _data to the client of the player
    ///
    /// \params _message 
    /// \params _data the object to be transfered to the client
    ////////////////////////////////////////////////////////////////////////////////
    this.emit = function(_message, _data) {
        if (this.m_client)
        {
            this.m_client.emit(_message, _data);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn initializeNewRound()
    ///
    /// \brief Prepares the player for a new round
    ///
    /// \param _numberOfRound the numer of the next round
    ////////////////////////////////////////////////////////////////////////////////
    this.initializeNewRound = function(_roundNumber) {
        this.m_setOfCards = [];
        this.m_stats.initializeNewRound(_roundNumber);
    };
}