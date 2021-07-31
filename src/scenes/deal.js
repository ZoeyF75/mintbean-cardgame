import Phaser from 'phaser';
import background from '../assets/table.jpeg';
import deck from '../assets/deck.png'; //0 - 51 frames, 52 is backside
import { createDeck } from '../assets/helper/deck';
import { configHeight, configWidth } from '../assets/helper/gameStateVariables';

class deal extends Phaser.Scene {
  constructor(){
		super({ key: 'deal' })
  }

  init(data) {
    this.balance = data.balance,
    this.betAmount = data.betAmount
  }
  
  preload ()
  {
    this.load.image('bg', background);
    this.load.spritesheet('deck', deck, {
      frameWidth: 1053 / 13,
      frameHeight: 587 / 5
    });
  }

  create ()
  {  
    this.add.image(configWidth / 2, configHeight / 2, 'bg').setScale(0.42);

    this.shuffledDeck = createDeck(); //returns array of shuffled deck
    this.mysprite = this.add.sprite(200, 200, 'deck').setScale(0.5);
    this.add.image(200, 300, 'deck').setScale(0.5).setFrame(this.shuffledDeck[0]);
    this.mysprite.setFrame(this.shuffledDeck[0]);
  }

  update ()
  {

  }
}

export default deal;