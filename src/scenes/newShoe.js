class newShoe extends Phaser.Scene {
  constructor(){
		super({ key: 'newShoe' })
  }
  
  create() {
    this.previousBalance = this.add.text(configWidth / 2, configHeight / 2, `Would you like to play another shoe?`, {
      fill: "#ffffff",
      fontSize: "50px",
      align: "center",
    }).setOrigin(0.5);

    let yes = this.add.image((configWidth / 2) - 150, configHeight - 50, 'betButton').setScale(0.12).setInteractive();
    yes.on('pointerover', function () {
      yes.setScale(0.15);
    });
    betB.on('pointerout', function () {
      yes.setScale(0.12);
    });
    yes.on('pointerdown', function () {
      this.scene.start("bet", {
        balance : this.balance,
        deckIndex : 0,
        shuffledDeck,
      });
      this.scene.remove("newShoe");
    });
    this.add.text((configWidth / 2) - 170, configHeight - 60, 'Yes', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    });

    //Clear button effects
    let no = this.add.image((configWidth / 2) + 150, configHeight - 50, 'clearButton').setScale(0.12).setInteractive();
    no.on('pointerover', function () {
      clearB.setScale(0.15);
    });
    no.on('pointerout', function () {
      no.setScale(0.12);
    });
    no.on('pointerdown', function () {
      location.reload(); //refreshes page and resets game
    });
    this.add.text((configWidth / 2) + 114, configHeight - 60, 'No', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    });
  }
}

export default newShoe;