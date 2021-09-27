new Vue({
    name: 'game',
    el: "#app",

    template: `<div id="app">
    <top-bar :turn="turn" :current-player-index="currentPlayerIndex" 
    :players="players"></top-bar>
    <overlay>
    Cek Cek </overlay>
    <transition name="hand">
    <hand :cards="testHand" v-if="!activeOverlay"
    @card-play="testPlayCard"></hand>
    
    </transition>
    </div>`,

    data: state,
    // <
    // card: def = "testCard"
    // @play = "handlePlay" > < /card>

    mounted() {
        console.log(this.$data === state);
    },
    computed: {
        testCard() {
            return cards.archers
        }
    },

    methods: {
        handlePlay() {
            console.log('You played a card');
        },
        createTestHand() {
            const cards = [];
            //ambil id
            const ids = Object.keys(cards);

            //ambil 5 kartu
            for (let i = 0; i < 5; i++) {
                cards.push(this.testDrawCard());
            }

            return cards;
        },
        testDrawCard() {
            //pilih kartu secara random dengan idnya
            const ids = Object.keys(cards);
            const randomId = ids[Math.floor(Math.random() * ids.length)];
            //return kartunya dengan definisi
            return {
                uid: cardUid++,
                id: randomId,
                def: cards[randomId]
            }
        },
        testPlayCard(card) {
            //remove the card from player's hand
            const index = this.testHand.indexOf(card);
            this.testHand.splice(index, 1);
        }
    },
    created() {
        this.testHand = this.createTestHand()
    },
});

// Window resize handling
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
});