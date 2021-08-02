import { configWidth, configHeight } from '../assets/helper/gameStateVariables';

class newShoe extends Phaser.Scene {
  constructor(){
		super({ key: 'newShoe' })
  }

  init(data) {
    this.balance = data.balance;
    this.deckIndex = data.deckIndex;
    this.shuffledDeck = data.shuffledDeck;
  }
  
  create() {
    this.changeScene = '';
    this.previousBalance = this.add.text(configWidth / 2, configHeight / 2, `Would you like to play another shoe?`, {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    }).setOrigin(0.5);

    let yes = this.add.image((configWidth / 2) - 150, configHeight - 50, 'betButton').setScale(0.12).setInteractive();
    yes.on('pointerover', function () {
      yes.setScale(0.15);
    });
    yes.on('pointerout', function () {
      yes.setScale(0.12);
    });
    yes.on('pointerdown', function () {
      this.scene.changeScene = 'bet';
    });
    this.add.text((configWidth / 2) - 170, configHeight - 60, 'Yes', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    });

    //Clear button effects
    let no = this.add.image((configWidth / 2) + 140, configHeight - 50, 'clearButton').setScale(0.12).setInteractive();
    no.on('pointerover', function () {
      no.setScale(0.15);
    });
    no.on('pointerout', function () {
      no.setScale(0.12);
    });
    no.on('pointerdown', function () {
      this.scene.changeScene = 'start';
    });
    this.add.text((configWidth / 2) + 125, configHeight - 60, 'No', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    });
  }

  update() {
    console.log(this.changeScene);
    if (this.changeScene == 'start'){
      location.reload();
    } else if (this.changeScene == 'bet') {
      this.scene.start("bet", {
        balance : this.balance,
        deckIndex : 0,
        shuffledDeck : this.shuffledDeck,
      });
      this.scene.sleep("newShoe");
    }
  }
}

export default newShoe;