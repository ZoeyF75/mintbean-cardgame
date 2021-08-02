import { calculateBalance } from '../assets/helper/balance';
import { configWidth, configHeight } from '../assets/helper/gameStateVariables';
import { createDeck } from '../assets/helper/deck';

class outcome extends Phaser.Scene {
  constructor(){
		super({ key: 'outcome' })
  }

  init(data) {
    this.balance = data.balance;
    this.deckIndex = data.deckIndex;
    this.shuffledDeck = data.shuffledDeck;
    this.outcome = data.outcome;
    this.bet = data.bet;
  }

  create() {
    this.add.image(configWidth / 2, configHeight / 2, 'bg');

    this.previousBalance = this.add.text(configWidth / 2, (configHeight / 2) - 150, `$${this.balance}`, {
      fill: "#FFD700",
      fontSize: "50px",
      align: "center",
    }).setOrigin(0.5);

    if (this.outcome == 'pay') {
      this.balance += this.bet;
      this.displayText(`+ $${this.bet}`, '#B0FC38');
    } else if (this.outcome == 'bust' || this.outcome == 'take') {
      this.balance -= this.bet;
      this.displayText(`- $${this.bet}`, '#FF0000');
    } else if (this.outcome == 'BLACKJACK') {
      this.balance += (this.bet * 1.5);
      this.displayText(`+ $${this.bet * 1.5}`, '#B0FC38');
    }

    this.displayTotal();

    setTimeout(() => {
      this.previousBalance.destroy();
      if (this.addition) {
        this.addition.destroy();
      }
      this.cameras.main.flash();
      this.add.text(configWidth / 2, (configHeight / 2) - 150, `$${this.balance}`, {
      fill: "#FFD700",
      fontSize: "50px",
      align: "center",
    }).setOrigin(0.5);
    }, 3000);

    setTimeout(() => {
      if (this.balance < 15) {
        this.scene.sleep("outcome");
        this.scene.start("gameover");
      } else if (this.deckIndex >= 156) {
        const shuffledDeck = createDeck(); //returns array of shuffled deck
        this.scene.sleep("outcome");
        this.scene.start("newShoe", {
          balance : this.balance,
          deckIndex : 0,
          shuffledDeck,
        });
      } else {
        this.scene.sleep("outcome");
        this.scene.start("bet", {
          balance : this.balance,
          deckIndex : this.deckIndex,
          shuffledDeck : this.shuffledDeck,
        });
      }
    }, 6000)
  }

  displayText(change, colour) {
    this.currentAlpha = 0;
    this.addition = this.add.text(configWidth / 2 + 200, (configHeight / 2) - 150, `${change}`, {
      fill: colour,
      fontSize: "50px",
      align: "center",
    }).setOrigin(0.5).setAlpha(this.currentAlpha);
  }

  displayTotal() {
    this.chips = calculateBalance(this.balance);
    let x = 0;
    let ytemp = 0;

    if (this.chips.purple > 0) {
      ytemp = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.purple; i++) {
        this.add.image(configWidth / 2, ytemp, 'purplechip').setScale(0.15).setOrigin(0.5);
        ytemp -= 20;
      }
    }
    if (this.chips.black > 0) {
      x = this.findx(x);
      let y;
      this.chips.purple > 1 ? y = ytemp: y = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.black; i++) {
        this.add.image(x, y, 'blackchip').setScale(0.15).setOrigin(0.5);
        y -= 20;
      }
    }

    if (this.chips.green > 0) {
      x = this.findx(x);
      let y = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.green; i++) {
        this.add.image(x, y, 'greenchip').setScale(0.15);
        y -= 20;
      }
    }
    if (this.chips.red > 0) {
      x = this.findx(x);
      let y = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.red; i++) {
        this.add.image(x, y, 'redchip').setScale(0.15);
        y -= 20;
      }
    }
    if (this.chips.blue > 0) {
      x = this.findx(x);
      let y = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.blue; i++) {
        this.add.image(x, y, 'bluechip').setScale(0.15);
        y -= 20;
      }
    }

    let y = (configHeight / 2) + 150; //50 cents will stack on top on ones if they exist
    if (this.chips.white > 0) {
      x = this.findx(x);
      for (let i = 0; i < this.chips.white; i++) {
        this.add.image(x, y, 'whitechip').setScale(0.15);
        y -= 20;
      }
    }
    if (this.chips.tan > 0) {
      x = this.findx(x);
      for (let i = 0; i < this.chips.tan; i++) {
        this.add.image(x, y, 'fiftycents').setScale(0.15);
        y -= 20;
      }
    }
  }

  findx(x) {
    if (x == 0) { //first
      x = configWidth / 2;
    } else if (x == configWidth / 2) { //second
      x += 100;
    } else if (x == (configWidth / 2) + 100) {
      x -= 200;
    } else if (x == (configWidth / 2) - 100) {
      x += 300;
    } else if (x == (configWidth / 2) + 200) {
      x -= 400;
    }
    return x;
  }

  update () {
    if (this.addition && this.currentAlpha <= 1) {
      this.addition.setAlpha(this.currentAlpha += 0.01);
    }
  }
}

export default outcome;