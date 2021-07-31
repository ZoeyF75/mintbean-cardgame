function createDeck() {
  let deck = [];
  for (let i = 0; i < 52; i++) {
    for (let j = 0; j < 6; j++) {
        deck.push(i);
    }
  }
  deck = shuffleDeck(deck);
  console.log(deck);
  return deck;
}

function shuffleDeck(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export {
  createDeck
}