////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = GameTable;


function GameTable (_gameId) {
    // -----------------------------------------------------------------------------
    // The parameters are essential, thus test if they are set, otherwise throw error
    // -----------------------------------------------------------------------------
    if (typeof(_gameId) === 'undefined') { throw new Error('_gameId parameter in DATA::GameTable constructor is undefined.'); }


    this.m_gameId       = _gameId;
	this.m_cardsOnTable = [];
	this.m_players      = [];
    this.m_stats        = null;


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setCardDeck(_deck)
    ///
    /// \brief Sets the card deck
    ///
    /// \param _deck The 
    ////////////////////////////////////////////////////////////////////////////////
    this.addPlayer = function (_player) {
        this.m_players.push(_player);
    };

	////////////////////////////////////////////////////////////////////////////////
    /// \fn addPlayer(_player)
    ///
    /// \brief Adds a player to the gametable
    ///
    /// \param _player The player instance to add
    ////////////////////////////////////////////////////////////////////////////////
	this.addPlayer = function (_player) {
        this.m_players.push(_player);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn removePlayerById(_id)
    ///
    /// \brief Removes a player from the gametable by its id
    ///
    /// \param _id The id of the player which should be removed
    ////////////////////////////////////////////////////////////////////////////////
    this.removePlayerById = function (_id) {
        for (var indexOfPlayer = 0; indexOfPlayer < this.m_players.length; indexOfPlayer++) 
        {
            if(this.m_players[indexOfPlayer].getId() === _id) 
            {
                this.m_players.splice(indexOfPlayer, 1);
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getIndexOfPlayerById(_id)
    ///
    /// \brief Looks up the index of a player by a given id
    ///
    /// \param _id The id of the player to look for
    /// \return the index of the player (-1 if not player has been found)
    ////////////////////////////////////////////////////////////////////////////////
    this.getIndexOfPlayerById = function (_id) {
        for (var indexOfPlayer = 0; indexOfPlayer < this.m_players.length; indexOfPlayer++) 
        {
            if(this.m_players[indexOfPlayer].getId() === _id) 
            {
                return indexOfPlayer;
            }
        }

        return -1;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getPlayerById(_id)
    ///
    /// \brief Looks up a player by a given id
    ///
    /// \param _id The id of the player to look for
    /// \return the index of the player (-1 if not player has been found)
    ////////////////////////////////////////////////////////////////////////////////
    this.getPlayerById = function (_id) {
    	var player = null;
    	var indexOfPlayer = this.getIndexOfPlayerById(_id);

    	if (indexOfPlayer !== -1)
    	{
    		player = this.m_players[indexOfPlayer];
    	}

        return player;
    };
}