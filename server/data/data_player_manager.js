////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = PlayerManager;


function PlayerManager () {
    // -----------------------------------------------------------------------------
    // All players are saved here 
    // -----------------------------------------------------------------------------
    this.m_players = [];


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn addPlayer(_player)
    ///
    /// \brief Adds a player 
    ///
    /// \param _player The player instance to add
    ////////////////////////////////////////////////////////////////////////////////
    this.addPlayer = function (_player) {
        this.m_players.push(_player);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn removePlayerById(_id)
    ///
    /// \brief Removes a player 
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
        var resultPlayerIndex = -1;

        for (var indexOfPlayer = 0; indexOfPlayer < this.m_players.length; indexOfPlayer++) 
        {
            if(this.m_players[indexOfPlayer].getId() === _id) 
            {
                resultPlayerIndex = indexOfPlayer;
                break;
            }
        }

        return resultPlayerIndex;
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn getPlayerById(_id)
    ///
    /// \brief Looks up a player by a given id
    ///
    /// \param _id The id of the player to look for
    /// \return the constructor instance of the player (if not found null)
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