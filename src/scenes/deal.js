import Phaser from 'phaser';
import { calculateBalance } from '../assets/helper/balance';
import { key, totalValue } from '../assets/helper/key';
import { configHeight, configWidth } from '../assets/helper/gameStateVariables';
let gameState = {stop : false};
let path;
let curve;
let points;
let graphics;

class deal extends Phaser.Scene {
  constructor(){
		super({ key: 'deal' })
  }

  init(data) {
    this.balance = data.balance,
    this.betAmount = data.betAmount
    this.deckIndex = data.deckIndex
    this.shuffledDeck = data.shuffledDeck
  }
  
  create()
  {  
    this.add.image(configWidth / 2, configHeight / 2, 'bg').setScale(0.42); //table bg

    this.chips = calculateBalance(this.betAmount); //calculates chips to display for bet
    let x = (configWidth / 2);
    let y = configHeight - 200;
    const circle = this.add.circle(x, y, 16, 0x90EE90);
    circle.setStrokeStyle(4, 0xefc53f);
    y -= 5;
    this.displayChips(x,y);
    
    //resets after every hand
    gameState.playersCard = true;
    this.playersPoints = [0, 0]; //array for aces
    this.dealersPoints = [0, 0];
    this.playerCardCount = 0; //used for visual effects and positioning
    this.dealerCardCount = 0;
    this.currentCardValue = 0;
    this.updatePlayerAmount = false;
    this.updateDealerAmount = false;
    this.outcome = '';

    this.addCard(); //runs 3 times for initial deal
    setTimeout(() => {
      this.addCard();
    }, 3000);
    setTimeout(() => {
      this.addCard();
    }, 6000);
    this.time = setTimeout(() => { //add player buttons, after initial deal
      this.secondDeal();
    }, 9000);
  }

  displayChips(x, y) {
    if (this.chips.black > 0) {
      for (let i = 0; i < this.chips.black; i++) {
        this.add.image(x, y, 'blackchip').setScale(0.05);
        y -= 10;
      }
    }
    if (this.chips.green > 0) {
      for (let i = 0; i < this.chips.green; i++) {
        this.add.image(x, y, 'greenchip').setScale(0.05);
        y -= 10;
      }
    }
    if (this.chips.red > 0) {
      for (let i = 0; i < this.chips.red; i++) {
        this.add.image(x, y, 'redchip').setScale(0.05);
        y -= 10;
      }
    }
    if (this.chips.blue > 0) {
      for (let i = 0; i < this.chips.blue; i++) {
        this.add.image(x, y, 'bluechip').setScale(0.05);
        y -= 10;
      }
    }

    if (this.chips.white > 0) {
      for (let i = 0; i < this.chips.white; i++) {
        this.add.image(x, y, 'whitechip').setScale(0.05);
        y -= 10;
      }
    }
  }

  addCard() {
    gameState.backCard = this.add.image((configWidth / 2) + 300, (configHeight / 2) - 300, 'deck').setScale(0.5).setFrame(52);
    graphics = this.add.graphics();
    path = { t: 0, vec: new Phaser.Math.Vector2() };
    points = [];
    if (gameState.playersCard) { //animation for players stack
      points.push(new Phaser.Math.Vector2((configWidth / 2) + 300, (configHeight / 2) - 300));
      points.push(new Phaser.Math.Vector2((configWidth / 2) + 200, configHeight - 350));
      points.push(new Phaser.Math.Vector2((configWidth / 2) + 100, configHeight - 300));
      points.push(new Phaser.Math.Vector2((configWidth / 2) + 40 + (this.playerCardCount * 15), configHeight - 250 - (this.playerCardCount * 15)));
      curve = new Phaser.Curves.Spline(points);
      this.tweens.add({
        targets: path,
        t: 1,
        duration: 2000,
      });
      setTimeout(() => {
        this.add.image((configWidth / 2) + 40 + (this.playerCardCount * 15), configHeight - 250 - (this.playerCardCount * 15), 'deck').setScale(0.5).setFrame(this.shuffledDeck[this.deckIndex]);
        gameState.backCard.destroy();
        this.currentCardValue = key(this.shuffledDeck[this.deckIndex], this.playerCardCount);
        if (Array.isArray(this.currentCardValue)) {
          if (this.playersPoints[1] == 0) { //inital ace
            this.playersPoints[1] += this.currentCardValue[1] + this.playersPoints[0];
            this.playersPoints[0] += this.currentCardValue[0];
          } else { //additional aces
            this.playersPoints[0]++;
            this.playersPoints[1]++;
          }
        } else {
          if (this.playersPoints[1] > 0) {
            this.playersPoints[0] += this.currentCardValue;
            this.playersPoints[1] += this.currentCardValue;
          } else {
            this.playersPoints[0] += this.currentCardValue;
          }
        }
        this.playerTotalVal = totalValue(this.playersPoints, this.playerCardCount);
        console.log("player", this.playersPoints, this.playerTotalVal);
        gameState.playersCard = false;
        this.deckIndex++;
        this.playerCardCount++;
      }, 2100);
    } else { //animation for dealers hand
        points.push(new Phaser.Math.Vector2((configWidth / 2) + 300, (configHeight / 2) - 300));
        points.push(new Phaser.Math.Vector2((configWidth / 2) + 100, (configHeight / 2) - 250));
        points.push(new Phaser.Math.Vector2((configWidth / 2) - (this.dealerCardCount * 50), (configHeight / 2) - 200));
        curve = new Phaser.Curves.Spline(points);
        this.tweens.add({
          targets: path,
          t: 1,
          duration: 1500,
        });
        setTimeout(() => {
          this.add.image((configWidth / 2) - (this.dealerCardCount * 50), (configHeight / 2) - 200, 'deck').setScale(0.5).setFrame(this.shuffledDeck[this.deckIndex]);
          gameState.backCard.destroy();
          this.currentCardValue = key(this.shuffledDeck[this.deckIndex]);
          if (Array.isArray(this.currentCardValue)) {
            if (this.dealersPoints[1] == 0) { //inital ace
              this.dealersPoints[1] += this.currentCardValue[1] + this.dealersPoints[0];
              this.dealersPoints[0] += this.currentCardValue[0];
            } else { //additional aces
              this.dealersPoints[0]++;
              this.dealersPoints[1]++;
            }
          } else {
            if (this.dealersPoints[1] > 0) {
              this.dealersPoints[0] += this.currentCardValue;
              this.dealersPoints[1] += this.currentCardValue;
            } else {
              this.dealersPoints[0] += this.currentCardValue;
            }
          }
        this.dealerTotalVal = totalValue(this.dealersPoints, this.dealerCardCount);
        console.log("dealer", this.dealersPoints, this.dealerTotalVal);
        this.deckIndex++;
        this.dealerCardCount++;
        gameState.playersCard = true;
      }, 2100);
    }
  }

  secondDeal() {
    this.updatePlayerAmount = true;
    this.hitButton = this.add.image((configWidth / 2) - 105, configHeight - 50, 'betButton').setScale(0.1).setAlpha(0.5).setInteractive();
      this.hitButton.on('pointerover', function () {
        this.scene.hitButton.setAlpha(1);
      });
      this.hitButton.on('pointerout', function () {
        this.scene.hitButton.setAlpha(0.5);
      });
      this.hitButton.on('pointerdown', function () {
        gameState.playersCard = true;
        this.scene.addCard(); //player
      });
    
    this.add.text((configWidth / 2) - 125, configHeight - 60, 'Hit', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    });
    this.stayButton = this.add.image((configWidth / 2) + 110, configHeight - 50, 'clearButton').setScale(0.1).setAlpha(0.5).setInteractive();
    this.stayButton.on('pointerover', function () {
      this.scene.stayButton.setAlpha(1);
    });
    this.stayButton.on('pointerout', function () {
      this.scene.stayButton.setAlpha(0.5);
    });
    this.stayButton.on('pointerdown', function () {
      gameState.playersCard = false;
      this.scene.disableFunctionality();
      if (this.scene.playerTotalVal != "BLACKJACK") {
        this.scene.playersPoints[0] > this.scene.playersPoints[1] ? this.scene.playerTotalVal = this.scene.playersPoints[0] : this.scene.playerTotalVal = this.scene.playersPoints[1];
      }
      this.scene.updatePlayerAmount = true;
      this.scene.addCard();
      this.scene.calculateDealerHand();
    });
    this.add.text((configWidth / 2) + 80, configHeight - 60, 'Stay', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    });
  }

  calculateDealerHand() {
    this.updateDealerAmount = true;

    this.dealerInterval = setInterval(() => {
      gameState.playersCard = false;
      this.addCard();
    }, 3000);
  }

  disableFunctionality(text) {
    if (this.hitButton) {
      this.hitButton.disableInteractive();
      this.stayButton.disableInteractive();
    }
    clearInterval(this.time);   

    if (text) {
      this.outcomeText = this.add.text(configWidth / 2, (configHeight / 2) - 75, `${text}`, {
        fill: "#FFD700",
        fontSize: "24px",
        align: "center",
      }).setOrigin(0.5);
      setTimeout(() => this.cameras.main.fadeOut(3000, 0, 0, 0), 3000)
      setTimeout(() => {
        this.playerText.destroy();
        this.scene.start("outcome", {
        balance : this.balance,
        deckIndex : this.deckIndex,
        shuffledDeck : this.shuffledDeck,
        outcome : this.outcome,
        bet : this.betAmount
      });
        this.scene.sleep("deal");
      }, 6000);
    }
  }

  configureOutcome() {
    if (this.dealerTotalVal != 'BLACKJACK') { // calculate dealer final val
      if (this.dealersPoints[1] != 0) {
        if (this.dealersPoints[1] <= 21 && this.dealersPoints[1] > this.dealersPoints[0]) {
          this.dealerTotalVal = this.dealersPoints[1];
        } else {
          this.dealerTotalVal = this.dealersPoints[0];
        }
      }
    }

    if (this.playerTotalVal == 'BLACKJACK') {
      if (this.dealerTotalVal == 'BLACKJACK') {
        this.outcome = "standoff";
      } else {
        this.outcome = "BLACKJACK";
      }
    } else if (this.dealerTotalVal == 'BLACKJACK' && this.playerTotalVal != "BLACKJACK") {
        this.outcome = "take";
    } else {
      if (this.playerTotalVal > this.dealerTotalVal) {
        this.outcome = "pay";
      } else if (this.playerTotalVal == this.dealerTotalVal) {
        this.outcome = "standoff";
      } else if (this.playerTotalVal < this.dealerTotalVal) {
        if (this.dealerTotalVal > 21) {
          this.outcome = "pay";
        } else {
          this.outcome = "take";
        }
      }
    }
    this.disableFunctionality(`––––––––––– ${this.outcome} –––––––––––`);
  }

  update()
  {
    if (!this.outcome) { //ensures text doesn't keep recreating itself
      if (this.dealersPoints[0] >= 17 || this.dealersPoints[1] >= 17 && this.dealersPoints[1] <= 21 ) {
        clearInterval(this.dealerInterval);
        this.configureOutcome();
      }

      if (this.playersPoints[1] == 0 && this.playersPoints[0] > 21) { //player bust
        this.disableFunctionality('––––––––––– BUST –––––––––––');
        this.outcome = "bust";
      } else if (this.playersPoints[0] > 21 && this.playersPoints[1] > 21) {
        this.disableFunctionality('––––––––––– BUST –––––––––––');
        this.outcome = "bust";
      } else if (this.playerTotalVal == "BLACKJACK" && this.dealersPoints[0] < 10 && this.dealersPoints[1] < 10) {
        this.disableFunctionality('––––––––––– BLACKJACK –––––––––––')
        this.outcome = "BLACKJACK";
      } else if (this.playerTotalVal == "BLACKJACK" && this.dealersPoints[0] >= 10 || this.dealersPoints[1] >= 10) {
        if (!gameState.stop) {
          this.disableFunctionality();
          this.updatePlayerAmount = true;
          this.calculateDealerHand();
        }
        gameState.stop = true;
      } 
    }
    
    if (this.updatePlayerAmount) {
      if (this.playerText) {
        this.playerText.destroy();
      }
      this.playerText = this.add.text((configWidth / 2), configHeight - 50, `${this.playerTotalVal}`, {
        fill: "#ffffff",
        fontSize: "24px",
        align: "center",
      }).setOrigin(0.5);
    }

    if (this.updateDealerAmount) {
      if (this.dealerText) {
        this.dealerText.destroy();
      }
      this.dealerText = this.add.text((configWidth / 2), 150, `${this.dealerTotalVal}`, {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    }).setOrigin(0.5);
    }
    

    if (gameState.backCard) {
      graphics.clear();
      curve.getPoint(path.t, path.vec);
      gameState.backCard.x = path.vec.x;
      gameState.backCard.y = path.vec.y;
    }
    
  }
}

export default deal;