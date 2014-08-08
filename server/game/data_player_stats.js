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

    this.getRoundScore = function(_roundNumber) {
        return this.m_roundData[_roundNumber].score;
    };

    this.getTotalScore = function() {
        return this.m_totalScore;
    };

    this.calculateRoundScore = function(_roundNumber) {
        var guessedTricks   = this.m_roundData[_roundNumber].numberOfGuessedTricks;
        var wonTricks       = this.m_roundData[_roundNumber].wonTricks;
        var trickDifference = Math.abs(guessedTricks - wonTricks);
        var roundScore      = 0;

        if (trickDifference === 0)
        {
            // -----------------------------------------------------------------------------
            // Player won exactly the number of tricks he has guessed.
            // The score will be 20 points for the "correct guessing" and an additional
            // number of points for each won trick
            // -----------------------------------------------------------------------------
            roundScore = 20 + 10 * wonTricks;
        }
        else 
        {
            // -----------------------------------------------------------------------------
            // Player did not win the exact number of tricks he has guessed.
            // The score will be -10 multiplied with the difference between the won tricks
            // to the guessed tricks
            // -----------------------------------------------------------------------------
            roundScore = -10 * trickDifference;
        }

        this.m_roundData[_roundNumber].score = roundScore;

        this.m_totalScore += roundScore;
    };
}