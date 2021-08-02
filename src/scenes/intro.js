import Phaser from 'phaser';
import { createDeck } from '../assets/helper/deck';
import { configWidth, configHeight } from '../assets/helper/gameStateVariables';

class intro extends Phaser.Scene {
  constructor(){
		super({ key: 'intro' })
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

    this.mysprite = this.add.sprite((configWidth / 2), (configHeight / 2) + 150, 'deck').setScale(0.5);
    
    let frameArray = [52];
    for (let i = 0; i < 52; i++) {
      frameArray.push(i);
    }
    this.anims.create( {
      key: "animation",
      frames: this.anims.generateFrameNumbers('deck', { frames: frameArray}),
      frameRate: 5,
      repeat: -1,
      yoyo: true
    });
    this.mysprite.play("animation");

    const shuffledDeck = createDeck(); //returns array of shuffled deck
    // const shuffledDeck = [29, 26, 3, 45, 14, 0, 38, 44];
    this.input.on("pointerdown", () => {
      this.scene.start("bet", {
        balance : 1500,
        deckIndex : 0,
        shuffledDeck
      });
      this.scene.sleep("intro");
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