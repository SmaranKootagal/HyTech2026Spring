function display_card(card){
    let parent= document.createElement("div");
    parent.classList.add("card");
    parent.innerText = card.type;
    document.body.appendChild(parent);
}