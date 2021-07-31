function calculateBalance(balance) {
  let chips = {
    black: 0,
    green: 0,
    red: 0,
    blue: 0,
    white: 0,
    tan: 0
  }

  if (balance / 100 > 1) {
    chips.black += Math.floor(balance / 100);
    balance -= (Math.floor(balance / 100)) * 100;
  }
  if (balance / 25 > 1) {
    chips.green += Math.floor(balance / 25);
    balance -= (Math.floor(balance / 25)) * 25;
  } 
  if (balance / 5 > 1) {
    chips.red += Math.floor(balance / 5);
    balance -= (Math.floor(balance / 5)) * 5;
  } 
  if (balance / 2 > 1) {
    chips.blue += Math.floor(balance / 2);
    balance -= (Math.floor(balance / 2)) * 2;
  } 
  if (balance / 1 > 1) {
    chips.white += Math.floor(balance / 1);
    balance -= (Math.floor(balance / 1)) * 1;
  }
  if (balance / 0.5 >= 1) {
    chips.tan += Math.floor(balance / 0.5);
    balance -= (Math.floor(balance / 0.5)) * 0.5;
  }  
  return chips;
}

export {
  calculateBalance,
}