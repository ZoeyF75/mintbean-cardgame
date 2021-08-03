import Phaser from 'phaser';

import start from '../assets/start.png';
import deck from '../assets/deck.png'; //0 - 51 frames, 52 is backside

import background from '../assets/table.jpeg';
import redchip from '../assets/chips.png';
import greenchip from '../assets/greenchip2.png';
import bluechip from '../assets/bluechip.png';
import blackchip from '../assets/blackchip.png';
import whitechip from '../assets/whitechip.png';
import purplechip from '../assets/purplechip.png';
import fiftycents from '../assets/50cent.png';
import betButton from '../assets/betButton.png';
import clearButton from '../assets/button.png';
import quit from '../assets/quit.png';

import gameover from '../assets/gameover.png';
import pixel from '../assets/16x16.png';

import lose from '../assets/sounds/lose.mp3';
import loseFF from '../assets/sounds/lose.ogg';
import jackpot from '../assets/sounds/jackpot.mp3';
import jackpotFF from '../assets/sounds/jackpot.ogg';
import coin from '../assets/sounds/coin.mp3';
import coinFF from '../assets/sounds/coin.ogg';
import error from '../assets/sounds/error.mp3';
import errorFF from '../assets/sounds/error.ogg';

class preloader extends Phaser.Scene {
  constructor(){
		super({ key: 'preloader' })
  }
  
  preload() {
    this.load.image('start', start);
    this.load.spritesheet('deck', deck, {
      frameWidth: 1053 / 13,
      frameHeight: 587 / 5
    });

    this.load.image('bg', background);
    this.load.image('whitechip', whitechip);
    this.load.image('bluechip', bluechip);
    this.load.image('redchip', redchip);
    this.load.image('greenchip', greenchip);
    this.load.image('blackchip', blackchip);
    this.load.image('purplechip', purplechip);
    this.load.image('fiftycents', fiftycents);
    this.load.image('betButton', betButton);
    this.load.image('clearButton', clearButton);
    this.load.image('quit', quit);

    this.load.image('gameover', gameover);
    this.load.image('pixel', pixel);

    this.load.audio("lose", [lose, loseFF]);
    this.load.audio("jackpot", [jackpot, jackpotFF]);
    this.load.audio("coin", [coin, coinFF]);
    this.load.audio("error", [error, errorFF]);

  }

  create() {
    this.scene.start('intro');
  }
}

export default preloader;