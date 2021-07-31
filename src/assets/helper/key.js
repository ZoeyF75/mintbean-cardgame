export function key(cardIndex) {
  let cardValue = 0;
  if (cardIndex == 0 || cardIndex == 13 || cardIndex == 26 || cardIndex == 39) {
    cardValue = 2;
  } else if (cardIndex == 1 || cardIndex == 14 || cardIndex == 27 || cardIndex == 40) {
    cardValue = 3;
  } else if (cardIndex == 2 || cardIndex == 15 || cardIndex == 28 || cardIndex == 41) {
    cardValue = 4;
  } else if (cardIndex == 3 || cardIndex == 16 || cardIndex == 29 || cardIndex == 42) {
    cardValue = 5;
  } else if (cardIndex == 4 || cardIndex == 17 || cardIndex == 30 || cardIndex == 43) {
    cardValue = 6;
  } else if (cardIndex == 5 || cardIndex == 18 || cardIndex == 31 || cardIndex == 44) {
    cardValue = 7;
  } else if (cardIndex == 6 || cardIndex == 19 || cardIndex == 32 || cardIndex == 45) {
    cardValue = 8;
  } else if (cardIndex == 7 || cardIndex == 20 || cardIndex == 33 || cardIndex == 46) {
    cardValue = 9;
  } else if (cardIndex == 8 || cardIndex == 21 || cardIndex == 34 || cardIndex == 47
          || cardIndex == 9 || cardIndex == 22 || cardIndex == 35 || cardIndex == 48
          || cardIndex == 10 || cardIndex == 23 || cardIndex == 36 || cardIndex == 49
          || cardIndex == 11 || cardIndex == 24 || cardIndex == 37 || cardIndex == 50
    ) {
    cardValue = 10;
  } else if (cardIndex == 12 || cardIndex == 25 || cardIndex == 38 || cardIndex == 51) {
    cardValue = [1, 11];
  }

  return cardValue;
}