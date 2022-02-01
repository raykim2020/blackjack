/* Blackjack
global functions
-endgame game
-start game
deal cards and initiate the round
Resources:
1. The deck of cards
-52 cards
-4 suits(hearts, clubs,spades,Diamond)
a.Datatype = 2 separate arrays, two arrays inside of an object
{
  suits: [],
  cards: []
}
Players
1. You
properties : {
  balance:''
  currentHand: [],
  choice: null(maybe)
}
What does the player does
-hit 
-stand
-Make bet
-doubledown (stretch goal)
-surrender (stretch goal)

2. computer/dealer
Properties:
currentHand:[],

Methods
-shuffle
-Deal cards
-Reset table,
-check


Dom Elements
*/
//https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript
//I got a lot of help setting up my game from this site.
//creating our resources/ essentials to our game before we go into any methods
const suits = ['Heart', 'Clubs', 'Spade', 'Diamond'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
//creating a class of player with two methods stand or hit.
let gameStart = false;
let stand = false;
class Player {
    constructor() {
        this.balance = 150;
        this.currentHand = [];
        this.choice = null;
    }

    deal() {
        for (let i = 0; i < 2; i++) {
            let hand = game.deck.pop()
            this.currentHand.push(hand)
        }
        console.log(this.currentHand)
        let total = 0;
        this.currentHand.forEach((card) => {
            total += card.Weight
        })
        const check = this.currentHand.filter(x => x.Value === 'A')
        const cardCheck = this.currentHand.indexOf(check[0])
        if (check.length > 0 && total > 21) {
            this.currentHand[cardCheck].Weight = 1;
        }
        console.log(this.currentHand)
    }
}
let playerWin = 0;
let dealerWin = 0;
const game = {
    deck: [],
    players: [],
    stand: false,
    alreadyHit: false,
    createDeck: function () {
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                let num = parseInt(values[i]);
                if (values[i] == 'J' || values[i] == 'Q' || values[i] == 'K') {
                    num = 10;
                }
                if (values[i] === 'A') {
                    num = 11;
                }
                const card = {
                    Value: values[i],
                    cardSuits: suits[j],
                    Weight: num
                };
                this.deck.push(card)

            }
        }
    },
    shuffle: function () {
        for (let i = 0; i < 100; i++) {
            let randomIndex = Math.floor((Math.random() * this.deck.length));
            let randomIndex2 = Math.floor((Math.random() * this.deck.length));
            let swap = this.deck[randomIndex];
            this.deck[randomIndex] = this.deck[randomIndex2];
            this.deck[randomIndex2] = swap
        }
    },
    start: function () {
        for (let i = 0; i < 2; i++) {
            this.players.push(new Player())
        }
        this.createDeck();
        this.shuffle();
        this.players[0].deal();
        this.players[1].deal();
        this.updateDisplay();
        const score = this.getScore();
        this.screenDisplay(`player:${score.player} dealer:${score.dealer}`)
        this.scoreBoard(`dealer:${dealerWin} player:${playerWin}`)
        // this.newScreen(); 
        console.log(score)
        // this.round();
    },
    getScore: function (player) {
        let playerScore = 0;
        let dealerScore = 0;
        for (let i = 0; i < this.players[0].currentHand.length; i++) {
            playerScore += (this.players[0].currentHand[i].Weight)
        }
        for (let j = 0; j < this.players[1].currentHand.length; j++) {
            dealerScore += (this.players[1].currentHand[j].Weight)
        }
        // console.log(playerScore)
        return {
            player: playerScore,
            dealer: dealerScore
        }
    },
    nextCard: function (player) {
        const hit = this.deck.pop();
        this.players[0].currentHand.push(hit);
        // this.updateDisplay();
        // console.log(this.players[0].currentHand)
        // this.endGame();
        // this.round();
        const score = game.getScore();
        console.log(score)
        this.updateDisplay();
        this.screenDisplay(`player:${score.player} dealer:${score.dealer}`)
        this.endGame();
        // let playerScore = this.playerScore += hit.Weight;
        // this.playerScore += (this.players[0].currentHand[currentHand.length-1].Weight)

        // console.log(hit.Weight)
    },
    dealerMove: function (dealer) {
        let score = this.getScore();
        while (score.dealer < 17 && score.dealer < score.player) {
            console.log(score);
            const hit = this.deck.pop();
            this.players[1].currentHand.push(hit);
            score = this.getScore();
            console.log(score)
            this.updateDisplay();
            // this.updateDisplay(score);
        }
        this.endGame();
    },
    endGame: function () {
        const score = this.getScore();
        // const check = players[0].currentHand.filter(x => x.Value === 'A')
        // if(check){
        //   console.log('Yes')
        // }
        // console.log('endgame',score)
        if (score.player > 21) {
            console.log('Player busts')
            this.screenDisplay(`Player busts`)
            dealerWin += 1
            this.refreshRound();
            console.log('dealer win', dealerWin)
            this.scoreBoard(`dealer:${dealerWin} player:${playerWin}`)
            this.newScreen();
        }

        if (score.dealer > 21) {
            console.log('Dealer bust, player wins')
            playerWin += 1
            console.log('player win', playerWin)
            this.screenDisplay(`Dealer bust, player wins`)
            this.refreshRound();
            this.scoreBoard(`dealer:${dealerWin} player:${playerWin}`)
            this.newScreen();
        }
        if (score.player > score.dealer && this.stand === true && score.player <= 21) {
            console.log(`Player has ${score.player} player wins. Dealer has ${score.dealer}`)
            playerWin += 1
            console.log('player win', playerWin)
            this.screenDisplay(`Player has ${score.player} player wins. Dealer has ${score.dealer}`)
            this.refreshRound();
            this.scoreBoard(`dealer:${dealerWin} player:${playerWin}`)
            this.newScreen();
        }
        if (score.player === score.dealer && this.stand && score.dealer >= 17) {
            console.log('Push')
            this.screenDisplay(`Push`)
            this.refreshRound();
            this.scoreBoard(`dealer:${dealerWin} player:${playerWin}`)
            this.newScreen();
        }
        if (score.player < score.dealer && score.dealer <= 21 && this.stand) {
            console.log(`Dealer wins`)
            this.screenDisplay(`Dealer Wins`)
            dealerWin += 1
            this.scoreBoard('dealer win', dealerWin)
            this.refreshRound();
            this.newScreen();
        }

    },
    newScreen: function () {
        const gameScreen = document.querySelector(".game")
        if (dealerWin === 3) {
            hitMeBtn.innerHTML = ''
            standBtn.innerHTML = ''
            reDealBtn.innerHTML = ''
            gameScreen.innerHTML = 'Dealer Won'
            console.log('Dealer has won')
        }
        if (playerWin === 3) {
            hitMeBtn.innerHTML = ''
            standBtn.innerHTML = ''
            reDealBtn.innerHTML = ''
            gameScreen.innerHTML = 'Player Won'
            console.log()
        }
    },
    refreshRound: function () {
        this.players[0].currentHand = [];
        this.players[1].currentHand = [];
        // this.screenDisplay('')
        const score = this.getScore();
    },
    reDeal: function () {
        this.players[0].deal();
        this.players[1].deal();
        const score = this.getScore();
        this.screenDisplay(`player: ${score.player}, dealer: ${score.dealer}`)
    },
    scoreBoard: function (message) {
        const board = document.querySelector(".scoreboard")
        board.innerText = message
    },
    screenDisplay: function (message) {
        const display = document.querySelector(".monitor")
        display.innerText = message
    },
    updateDisplay: function () {
        //  display.textContent = `${this.players[0].currentHand[0].Weight}`
        // console.log(this.players[0].currentHand)
        // create a div for each card append to deck div
        const display = document.querySelector(".deck1")
        const display1 = document.querySelector(".deck2")
        display.innerHTML = ''
        display1.innerHTML = ''
        for (let i = 0; i < this.players[0].currentHand.length; i++) {
            // display.innerHTML = ''
            const divEl = document.createElement('div')
            divEl.classList.add('card')
            const cardWeight = document.createElement('div')
            const cardSuit = document.createElement('p')
            cardWeight.innerHTML = `${this.players[0].currentHand[i].Value}`
            cardSuit.innerHTML = `${this.players[0].currentHand[i].cardSuits}`
            console.log(display)
            // console.log(cardObj)
            divEl.appendChild(cardWeight)
            divEl.appendChild(cardSuit)
            display.appendChild(divEl)
        }
        for (let i = 0; i < this.players[1].currentHand.length; i++) {
            const divEl = document.createElement('div')
            divEl.classList.add('card')
            const cardWeight = document.createElement('div')
            const cardSuit = document.createElement('p')
            cardWeight.innerHTML = `${this.players[1].currentHand[i].Value}`
            cardSuit.innerHTML = `${this.players[1].currentHand[i].cardSuits}`
            console.log(display)
            // console.log(cardObj)
            divEl.appendChild(cardWeight)
            divEl.appendChild(cardSuit)
            display1.appendChild(divEl)
        }
    }
}

const newBtn = document.querySelector(".new")
newBtn.addEventListener("click", function () {
    // playerWin = 0;
    // dealerWin = 0;
    // // gameStart = false;
    // stand = false;
    // game.deck = [];
    // game.players = [];
    // game.stand = false;
    // game.start();
    window.location.reload();
})
const hitMeBtn = document.querySelector(".hit")
hitMeBtn.addEventListener("click", function () {
    const score = game.getScore();
    if (score.player <= 21 && game.stand === false && score.dealer > 1) {
        game.nextCard();
    }
});
const standBtn = document.querySelector(".stand")
standBtn.addEventListener("click", function () {
    game.stand = true;
    game.dealerMove();

});
const reDealBtn = document.querySelector(".deal")
reDealBtn.addEventListener("click", function () {
    game.stand = false;
    game.refreshRound();
    game.reDeal();
    game.updateDisplay();
    const score = this.getScore();
    console.log(score)
    // console.log('hey')
})
game.start();