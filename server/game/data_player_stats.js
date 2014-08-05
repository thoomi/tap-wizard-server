////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = PlayerStats;


////////////////////////////////////////////////////////////////////////////////
/// \fn RoundData()
///
/// \brief The stats data for one round
////////////////////////////////////////////////////////////////////////////////
function RoundData() {
    this.numberOfGuessedTricks = -1;
    this.numberOfWonTricks     = -1;
    this.score                 = -1;
}


////////////////////////////////////////////////////////////////////////////////
/// \fn PlayerStats()
///
/// \brief The stats component of a player, it tracks the points per round
////////////////////////////////////////////////////////////////////////////////
function PlayerStats () {
	// -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
	this.m_totalScore       = 0;
    this.m_roundData        = [];
    this.currentRoundNumber = 0;

    this.initializeNewRound = function (_roundNumber) {
        this.currentRoundNumber        = _roundNumber;
        this.m_roundData[_roundNumber] = new RoundData();
    };

    this.setGuessedTricks = function (_numberOfGuessedTricks) {
        this.m_roundData[this.currentRoundNumber].numberOfGuessedTricks = _numberOfGuessedTricks;
    };

    this.incrementWonTricks = function () {
        this.m_roundData[this.currentRoundNumber].numberOfWonTricks++;
    };
    this.hasGuessedTricks = function() {
        return this.m_roundData[this.currentRoundNumber].numberOfGuessedTricks !== -1 ? true : false;
    };
}