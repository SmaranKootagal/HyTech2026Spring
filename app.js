var Dealer_Score= 0
var Player_Score= 0


class Card{
    value;
    type;

    constructor(value, type){
        this.value= value;
        this.type= type;
    }
}
let suits=["Spades", "Clubs", "Hearts", "Diamonds"]
let types =["2", "3", "4", "5", "6", "7", "8","9", "10", "Jack", "Queen", "King","Ace"]
let cards= [];
reset();

//Generates cards
function generate_cards(){
return suits.flatMap((suit) => {
    return types.map((type, i) =>{
        let val =Math.min(i+2, 10);
        let t = type + "of" + suit;
        return new Card(val , t);
        })
    })

}
//Betting System

document.querySelectorAll('.chip'). forEach (chip => {
    chip.addEventListener('click', () => {
        if (STATE.phase !== 'bet') return;
        const val= parseInt(chip.CDATA_SECTION_NODE.val);
        if(STATE.bet +val > STATE.balance) return;
        STATE.bet +=val;
        updateBank();
    });
});



function shuffle(cards) {
    for (let i= 0; i < cards.length; i++){
        let swap_index = Math.round(Math.random() * (cards.length - 1 - i) + i);
        [cards[i], cards[swap_index]] = [cards[swap_index], cards[i]];
    }
}

function reset(){
    cards= generate_cards();
    shuffle(cards);
    shuffle(cards);
    shuffle(cards);
}

function deal(){
    let card = cards.pop();
    display_card(card);
    
}


deal();
deal();
deal();
deal();
function hit() {
  if (STATE.phase !== 'play') return;
  STATE.playerHand.push(drawCard());
  render(true);
  setPlayButtons(false);  // no double after hit
  if (isBust(STATE.playerHand)) {
    revealDealer();
    endRound('bust');
  }
}
 
function stand() {
  if (STATE.phase !== 'play') return;
  revealDealer();
  dealerPlay();
}
 
function doubleDown() {
  if (STATE.phase !== 'play') return;
  STATE.balance -= STATE.bet;
  STATE.bet *= 2;
  updateBank();
  STATE.playerHand.push(drawCard());
  render(true);
  revealDealer();
  if (isBust(STATE.playerHand)) {
    endRound('bust');
  } else {
    dealerPlay();
  }
}
function revealDealer (){
    render(false);
}

function dealerPlay(){
    while (handValue ())
}