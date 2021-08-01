import Phaser from 'phaser';
import { calculateBalance } from '../assets/helper/balance';
import { key, totalValue } from '../assets/helper/key';
import { configHeight, configWidth } from '../assets/helper/gameStateVariables';
let gameState = {};
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
    gameState.addcard = true;

    this.addCard(); //runs 3 times for initial deal
    setTimeout(() => {
      this.addCard();
    }, 3000);
    setTimeout(() => {
      this.addCard();
    }, 6000);
    setTimeout(() => { //add player buttons, after initial deal
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
      points.push(new Phaser.Math.Vector2((configWidth / 2) + 40 + this.playerCardCount, configHeight - 250 - this.playerCardCount));
      curve = new Phaser.Curves.Spline(points);
      this.tweens.add({
        targets: path,
        t: 1,
        duration: 2000,
      });
      setTimeout(() => {
        this.add.image((configWidth / 2) + 40 + this.playerCardCount, configHeight - 250 - this.playerCardCount, 'deck').setScale(0.5).setFrame(this.shuffledDeck[this.deckIndex]);
        gameState.backCard.destroy();
        this.currentCardValue = key(this.shuffledDeck[this.deckIndex]);
        if (Array.isArray(this.currentCardValue)) {
          this.playersPoints[0] += this.currentCardValue[0];
          this.playersPoints[1] += this.currentCardValue[1];
        } else {
          if (this.playersPoints[1] > 0) {
            this.playersPoints[0] += this.currentCardValue[0];
            this.playersPoints[1] += this.currentCardValue[0];
          } else {
            this.playersPoints[0] += this.currentCardValue;
          }
        }
        this.playerTotalVal = totalValue(this.playersPoints);
        console.log("player", this.playersPoints, this.playerTotalVal);
        gameState.playersCard = false;
        this.deckIndex++;
        this.playerCardCount += 15;
      }, 2100);
    } else { //animation for dealers hand
        points.push(new Phaser.Math.Vector2((configWidth / 2) + 300, (configHeight / 2) - 300));
        points.push(new Phaser.Math.Vector2((configWidth / 2) + 100, (configHeight / 2) - 250));
        points.push(new Phaser.Math.Vector2((configWidth / 2) - this.dealerCardCount, (configHeight / 2) - 200));
        curve = new Phaser.Curves.Spline(points);
        this.tweens.add({
          targets: path,
          t: 1,
          duration: 1500,
        });
        setTimeout(() => {
          this.add.image((configWidth / 2) - this.dealerCardCount, (configHeight / 2) - 200, 'deck').setScale(0.5).setFrame(this.shuffledDeck[this.deckIndex]);
          gameState.backCard.destroy();
          this.currentCardValue = key(this.shuffledDeck[this.deckIndex]);
          if (this.dealersPoints[1] > 0) {
            this.dealersPoints[0] += this.currentCardValue[0];
            this.dealersPoints[1] += this.currentCardValue[0];
          } else {
            this.dealersPoints[0] += this.currentCardValue;
          }
          this.dealerTotalVal = totalValue(this.dealersPoints);
          console.log("dealer", this.dealersPoints, this.dealerTotalVal);
          this.deckIndex++;
          this.dealerCardCount += 50;
          gameState.playersCard = true;
        }, 2100);
    }
  }

  secondDeal() {
    this.hitButton = this.add.image((configWidth / 2) - 100, configHeight - 50, 'betButton').setScale(0.1).setInteractive();
      this.add.text((configWidth / 2) - 120, configHeight - 60, 'Hit', {
        fill: "#ffffff",
        fontSize: "24px",
        align: "center",
      });
      this.stayButton = this.add.image((configWidth / 2) + 105, configHeight - 50, 'clearButton').setScale(0.1).setInteractive();
      this.add.text((configWidth / 2) + 85, configHeight - 60, 'Stay', {
        fill: "#ffffff",
        fontSize: "24px",
        align: "center",
      });

      this.add.text((configWidth / 2), configHeight - 50, `${this.playerTotalVal}`, {
        fill: "#ffffff",
        fontSize: "24px",
        align: "center",
      }).setOrigin(0.5);
    
  }

  update ()
  {
    if (gameState.backCard) {
      graphics.clear();
      curve.getPoint(path.t, path.vec);
      gameState.backCard.x = path.vec.x;
      gameState.backCard.y = path.vec.y;
    }
    
  }
}

export default deal;