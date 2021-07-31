import Phaser from 'phaser';
import start from '../assets/start.png';
import deck from '../assets/deck.png';
import { createDeck } from '../assets/helper/deck';
import { configWidth, configHeight } from '../assets/helper/gameStateVariables';

class intro extends Phaser.Scene {
  constructor(){
		super({ key: 'intro' })
  }
  
  preload() {
    this.load.image('start', start);
    this.load.spritesheet('deck', deck, {
      frameWidth: 1053 / 13,
      frameHeight: 587 / 5
    });
  }

  create() {
    this.label = this.add.text((configWidth / 2) - 135, (configHeight / 2) - 150, '', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center"
    });
    this.typewriteText('click anywhere to...');

    this.time = setTimeout(() => {
      this.add.image((configWidth / 2), (configHeight / 2), 'start');
    }, 2500)

    this.shuffledDeck = createDeck(); //returns array of shuffled deck
    this.mysprite = this.add.sprite((configWidth / 2), (configHeight / 2) + 150, 'deck').setScale(0.5);

    this.anims.create( {
      key: "animation",
      frames: this.anims.generateFrameNumbers("deck"),
      frameRate: 5,
      repeat: -1
    });
    this.mysprite.play("animation");

    this.input.on("pointerdown", () => {
      this.scene.start("bet", {
        balance : 350
      });
      this.scene.remove("intro");
      clearTimeout(this.time);
    });
  }

  typewriteText(text)
  {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        this.label.text += text[i]
        ++i
      },
      repeat: length - 1,
      delay: 100
    })
  }
}

export default intro;