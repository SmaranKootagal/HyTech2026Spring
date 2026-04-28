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
//Hit, Stand, and Double Down(Player Actions in general ig)
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

function isRed(suit) {return suit === 'heart', suit === 'diamond';}

function cardHTML(card,hidden = false) {
    if (hidden) return `<div class="card hidden"></div>`;
    const cls= isRed(card.suit) ? 'card red' : 'card';
    return `
    <div class="${cls}">
    <div class="corner top">${card.rank}<br>${card.suit}</div> 
    </div>`;
}
function renderHand(hand, elId, hideSecond = false){
    const el = document.getElementById(elID);
    el.innerHTML = hand.map ((c,i) => cardHTML (c, hideSecond && i===1)) .join('');
}
function renderScore(hand, elID, hideSecond = false) {
    const el = document.getElementById;
    if (hand.length === 0) { el.textContent = '-'; el.className = 'score-badge'; return;}
    if (hideSecond) { el.textContent ='?'; el.className = 'score-badge'; return;}
    const v = handValue(hand);
    el.textContent = v;
    el.className ='score-badge' + (v>21 ? 'bust' : isBlackjack(hand) ? 'blackjack' : '');
}
function returnMessage(msg, cls = '') {
    const el = document.getElementById('status');
    el.textContent= msg;
    el.className= cls;
}
function updateBank(){
    document.getElementById('balance-display').textContent =`$${STATE.balance}`;
    document.getElementById('bet-amount').textContent =`$${STATE.bet}`;
    document.getElementById('balance-display').textContent = STATE.wins;
}

function showBetUI(show) {
    document.getElementById('action-btns').style.display = show ? 'flex' : 'none';
    document.getElementById('play-btns').style.display = show ? 'none' : 'flex';
    document.getElementById('chip-row').style.display = show ? 'flex' : 'none';
}

function setPlayButtons(canDouble) {
    document.getElementById('btn-double').disabled = !canDouble;
}
 //The Whole Dealing Process:
function deal() {
    if (STATE.bet === 0) { setStatus('Place a bet'); return;}
    STATE.phase = 'play';
    STATE.balance -= STATE.bet;
    updateBank();

    STATE.playerHand = [drawCard(), drawCard()];
    STATE.dealerHand = [drawCard(), drawCard()];

    render(true);
    showBetUI(false);
    setPlayButtons(STATE.balance >= STATE.bet);

    //This is next piece of code is to check and see if the player has Blackjack
    if (isBlackjack (STATE.playerHand)){
        revealDealer();
        if (isBlackjack(STATE.dealerHand))  {
            endRound('push');
        } else{
            endRound('blackjack');
        }
        return;
    }
    setStatus('Your turn');
}
//Dealer side of the game
function revealDealer() {
    render(false);
}

function dealerPlay() {
    while (handValue(STATE.dealerHand) <17 || isSoft17(STATE.dealerHand)) {
        STATE.dealerHand.push(drawCard());
    }

    render(false);
    resolveRound();
}
function resolveRound() {
    const pv = handValue(STATE.playerHand);
    const dv = handValue(STATE.dealerHand);
    const dBust =handValue(STATE.dealerHand)

    if (dBust || pv > dv )              endRound('win');
    else if (pv === dv)                 endRound('push');
    else                                endRound('lose');
}

function endRound(result)  {
    STATE.phase = 'done';
    let msg, cls, payout;

    switch(result) {
        case 'blacjack':
            payout= Math.floor(STATE.bet * 2.5);
            msg= `Blackjack! +$${payout-STATE.bet}`; cls ='win'; break;
        case 'win':
            payout = STATE.bet * 2;
            msg = `You Win! +$${STATE.bet}`; cls='win'; break;
        case 'push'
            payout = STATE.bet;
            msg = `Push - Bet Returned`; cls='push'; break;
    }

}
