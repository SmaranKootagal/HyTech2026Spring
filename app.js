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


let cards= suits.flatMap((suit) => {
    return types.map((type, i) =>{
        let val =Math.min(i+2, 10);
        let t = type + "of" + suit;
        return new Card(val , t)
    })
})


console.log(cards);
function hit_logic(){
    console.log("hit")
}
function stand_logic(){
    console.log("stand")
}

