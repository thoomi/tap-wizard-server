////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var Player = require('./player.js');


////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = PlayerFactory;


function PlayerFactory () {

    var numberOfCreatedPlayers = 0;

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn createPlayerWithName(_deck)
    ///
    /// \brief Creates a new player
    ///
    /// \return A fresh palyer object
    ////////////////////////////////////////////////////////////////////////////////
    this.createNewPlayerWithName = function (_name) {
        // -----------------------------------------------------------------------------
        // TODO: Develop a proper way to generate a unique player id
        // -----------------------------------------------------------------------------
        numberOfCreatedPlayers++;
        var playerId = (100 + numberOfCreatedPlayers).toString();

        // -----------------------------------------------------------------------------
        // Instantiate a new player
        // -----------------------------------------------------------------------------
        var player = new Player({id: playerId, name: _name});

        // -----------------------------------------------------------------------------
        // Finally return the game so that other modules can use its id as reference
        // -----------------------------------------------------------------------------
        return player;
    };
}