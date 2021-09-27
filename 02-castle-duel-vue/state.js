// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
    // World
    worldRatio: getWorldRatio(),
    // TODO Other things
    turn: 1,
    players: [{
            name: 'Muhsin Ahadi',
            // Starting stats
            food: 10,
            health: 10,
            // Is skipping is next turn
            skipTurn: false,
            // Skiped turn last time
            skippedTurn: false,
            hand: [],
            lastPlayedCardId: null,
            dead: false,
        },
        {
            name: 'The World',
            // Starting stats
            food: 10,
            health: 10,
            // Is skipping is next turn
            skipTurn: false,
            // Skiped turn last time
            skippedTurn: false,
            hand: [],
            lastPlayedCardId: null,
            dead: false,
        }
    ],
    currentPlayerIndex: Math.round(Math.random()),

    testHand: [],
    activeOverlay: null,

}