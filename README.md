/* Creating a game of Blackjack. In a game of blackjack a player has to go up against the house (dealer) the person whose card reaches the closest to 21 without going over wins. Dealers must hit past 16 and can stand at 17 if they wish. Players can choose to stand whenever they want. If the player wins they get a point if dealer wins dealer gets a point. First to three wins.





Stretch goals:
 - Add a surrender button
 - Add a betting mechanic
 -Add a double down method.
*/
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