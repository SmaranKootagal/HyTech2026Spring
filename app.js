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




function shuffle(cards) {
    for (let i= 0; i < cards.length; i++){
        let swap_index = Math.round(Math.random() * (cards.length - 1 - i) + i);
        [cards[i], cards[swap_index]] = [cards[swap_index], cards[i]];
    }
}
function print_cards(cards) {
    cards.forEach((card) => {
        print_card(card);
    })
}


function print_card(card) {
    console.log (card.value, card.type)
}

function reset(){
    cards= generate_cards();
    shuffle(cards);
    shuffle(cards);
    shuffle(cards);
}

function deal(){
    let card = cards.pop();
    print_card(card);
    display_card(card);
    
}


deal();
deal();
deal();
deal();
function hit_logic(){
    deal();
}
function stand_logic(){
    console.log("stand")
}

