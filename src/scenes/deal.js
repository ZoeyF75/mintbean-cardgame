import Phaser from 'phaser';
import { calculateBalance } from '../assets/helper/balance';
import { configHeight, configWidth } from '../assets/helper/gameStateVariables';
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
    
    this.backCard = this.add.image((configWidth / 2) + 300, (configHeight / 2) - 300, 'deck').setScale(0.5).setFrame(52);
    
    graphics = this.add.graphics();
    path = { t: 0, vec: new Phaser.Math.Vector2() };
    points = [];
    points.push(new Phaser.Math.Vector2((configWidth / 2) + 300, (configHeight / 2) - 300));
    points.push(new Phaser.Math.Vector2((configWidth / 2) + 200, configHeight - 300));
    points.push(new Phaser.Math.Vector2((configWidth / 2) + 100, configHeight - 200));
    points.push(new Phaser.Math.Vector2(configWidth / 2, configHeight - 150));
    curve = new Phaser.Curves.Spline(points);
    this.tweens.add({
        targets: path,
        t: 1,
        duration: 2000,
    });
    // this.mysprite = this.add.sprite(200, 200, 'deck').setScale(0.5);
    // this.add.image(200, 300, 'deck').setScale(0.5).setFrame(this.shuffledDeck[0]);
    // this.mysprite.setFrame(this.shuffledDeck[0]);

  }

  update ()
  {
    graphics.clear();
    curve.getPoint(path.t, path.vec);
    this.backCard.x = path.vec.x;
    this.backCard.y = path.vec.y;
  }
}

export default deal;