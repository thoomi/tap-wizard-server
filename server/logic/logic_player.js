////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = Player;


////////////////////////////////////////////////////////////////////////////////
/// \fn Player(params)
///
/// \brief The logic representation of a player
////////////////////////////////////////////////////////////////////////////////
function Player () {
    // -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
    this.m_playerData = null;

    this.m_totalScore       = 0;
    this.m_roundData        = [];
    this.currentRoundNumber = 0;


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setPlayerData()
    ///
    /// \brief Sets the data representation of the player
    ////////////////////////////////////////////////////////////////////////////////
    this.setPlayerData = function(_gameRoomData) {
        this.m_playerData = _gameRoomData;
    };



    ////////////////////////////////////////////////////////////////////////////////
    /// \fn RoundData()
    ///
    /// \brief Player logic internel representatino of the score data per round
    ////////////////////////////////////////////////////////////////////////////////
    function RoundData() {
        this.numberOfGuessedTricks = 0;
        this.numberOfWonTricks     = 0;
        this.score                 = 0;
    }

    this.initializeNewRound = function (_roundNumber) {
        this.currentRoundNumber        = _roundNumber;
        this.m_roundData[_roundNumber] = new RoundData();
    };

    this.setGuessedTricks = function (_numberOfGuessedTricks) {
        this.m_roundData[this.currentRoundNumber].numberOfGuessedTricks = _numberOfGuessedTricks;
    };

    this.hasGuessedTricks

    this.incrementWonTricks = function () {
        this.m_roundData[this.currentRoundNumber].numberOfWonTricks++;
    };
}