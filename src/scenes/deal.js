import Phaser from 'phaser';
import { calculateBalance } from '../assets/helper/balance';
import { key } from '../assets/helper/key';
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
  
  create ()
  {  
    this.add.image(configWidth / 2, configHeight / 2, 'bg').setScale(0.42); //table bg

    // this.chips = calculateBalance(this.betAmount); //calculates chips to display for bet
    // let x = configWidth / 2;
    // let y = configHeight - 120;
    // if (this.chips.black > 0) {
    //   y == configHeight - 120 ? configHeight - 120 : y -= 10;
    //   let y = (configHeight / 2) + 150;
    //   for (let i = 0; i < this.chips.black; i++) {
    //     this.add.image(x, y, 'blackchip').setScale(0.07);
    //     y -= 10;
    //   }
    // }
    // if (this.chips.green > 0) {
    //   y == configHeight - 120 ? configHeight - 120 : y -= 10;
    //   let y = (configHeight / 2) + 150;
    //   for (let i = 0; i < this.chips.green; i++) {
    //     this.add.image(x, y, 'greenchip').setScale(0.07);
    //     y -= 10;
    //   }
    // }
    // if (this.chips.red > 0) {
    //   y == configHeight - 120 ? configHeight - 120 : y -= 10;
    //   let y = (configHeight / 2) + 150;
    //   for (let i = 0; i < this.chips.red; i++) {
    //     this.add.image(x, y, 'redchip').setScale(0.07);
    //     y -= 10;
    //   }
    // }
    // if (this.chips.blue > 0) {
    //   y == configHeight - 120 ? configHeight - 120 : y -= 10;
    //   let y = (configHeight / 2) + 150;
    //   for (let i = 0; i < this.chips.blue; i++) {
    //     this.add.image(x, y, 'bluechip').setScale(0.07);
    //     y -= 10;
    //   }
    // }

    // if (this.chips.white > 0) {
    //   y == configHeight - 120 ? configHeight - 120 : y -= 10;
    //   for (let i = 0; i < this.chips.white; i++) {
    //     this.add.image(x, y, 'whitechip').setScale(0.07);
    //     y -= 10;
    //   }
    // }

    //resets after every hand
    gameState.xDiff = 0; 
    gameState.ydiff = 0;
    gameState.playersCard = true;
    this.addCard(); //runs 3 times for sure
    gameState.addcard = true;
    this.playersPoints = []; //array for aces
    this.dealersPoints = [];


    // this.mysprite = this.add.sprite(200, 200, 'deck').setScale(0.5);
    // this.add.image(200, 300, 'deck').setScale(0.5).setFrame(this.shuffledDeck[0]);
    // this.mysprite.setFrame(this.shuffledDeck[0]);

  }

  addCard () {
    gameState.backCard = this.add.image((configWidth / 2) + 300, (configHeight / 2) - 300, 'deck').setScale(0.5).setFrame(52);
    graphics = this.add.graphics();
    path = { t: 0, vec: new Phaser.Math.Vector2() };
    points = [];
    if (gameState.playersCard) { //animation for players stack
      points.push(new Phaser.Math.Vector2((configWidth / 2) + 300, (configHeight / 2) - 300));
      points.push(new Phaser.Math.Vector2((configWidth / 2) + 200, configHeight - 350));
      points.push(new Phaser.Math.Vector2((configWidth / 2) + 100, configHeight - 300));
      points.push(new Phaser.Math.Vector2((configWidth / 2) + gameState.xDiff, configHeight - 200 - gameState.ydiff));
      curve = new Phaser.Curves.Spline(points);
      this.tweens.add({
        targets: path,
        t: 1,
        duration: 2000,
      });
      setTimeout(() => {
        this.add.image((configWidth / 2) + gameState.xDiff, configHeight - 200 - gameState.ydiff, 'deck').setScale(0.5).setFrame(this.shuffledDeck[this.deckIndex]);
        gameState.backCard.destroy();
      }, 2100);
      this.deckIndex++;
      gameState.xDiff += 10;
      gameState.ydiff += 10;
      gameState.playersCard = false;
      
    } else { //animation for dealers hand

    }
  
  }

  update ()
  {
    if (gameState.addcard) {
      console.log("runs");
      graphics.clear();
      curve.getPoint(path.t, path.vec);
      gameState.backCard.x = path.vec.x;
      gameState.backCard.y = path.vec.y;
      this.gameState.addcard = false;
    }
    
  }
}

export default deal;