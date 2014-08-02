////////////////////////////////////////////////////////////////////////////////
/// Dependencies
////////////////////////////////////////////////////////////////////////////////
var DATA = {};
DATA.GameRoom = require('../data/data_gameroom.js');
DATA.Card = require('../data/data_card');

////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = GameRoom;


function GameRoom () {
    // -----------------------------------------------------------------------------
    // Member attributes.
    // -----------------------------------------------------------------------------
    this.m_gameRoomData = null;


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn setGameRoomData()
    ///
    /// \brief Set the game room data object
    ////////////////////////////////////////////////////////////////////////////////
    this.setGameRoomData = function(_gameRoomData) {
        this.m_gameRoomData = _gameRoomData;
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn playerJoinGame()
    ///
    /// \brief Add player to game room
    ////////////////////////////////////////////////////////////////////////////////
    this.playerJoin = function(_player) {
        this.m_gameRoomData.addPlayer(_player);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn playerJoinGame()
    ///
    /// \brief Remove player from game room
    ////////////////////////////////////////////////////////////////////////////////
    this.playerLeave = function(_player) {
        this.m_gameRoomData.removePlayerById(_player.getId());
    };


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn prepareForStart()
    ///
    /// \brief Prepares the game room to be ready for starting
    ////////////////////////////////////////////////////////////////////////////////
    this.prepareForStart = function() {
        // -----------------------------------------------------------------------------
        // Create the card deck
        // -----------------------------------------------------------------------------
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  1 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  2 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  3 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  4 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  5 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  6 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  7 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  8 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value:  9 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value: 10 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value: 11 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value: 12 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'red', value: 13 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  1 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  2 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  3 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  4 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  5 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  6 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  7 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  8 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value:  9 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value: 10 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value: 11 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value: 12 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'blue', value: 13 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  1 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  2 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  3 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  4 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  5 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  6 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  7 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  8 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value:  9 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value: 10 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value: 11 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value: 12 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'yellow', value: 13 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  1 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  2 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  3 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  4 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  5 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  6 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  7 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  8 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value:  9 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value: 10 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value: 11 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value: 12 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'green', value: 13 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'wizard', value:  999 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'wizard', value:  999 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'wizard', value:  999 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'wizard', value:  999 }));

        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'fool', value:  0 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'fool', value:  0 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'fool', value:  0 }));
        this.m_gameRoomData.cardDeck.addCard(new DATA.Card({ suit: 'fool', value:  0 }));


        this.m_gameRoomData.setState(DATA.GameRoom.States.READY);
    };

}