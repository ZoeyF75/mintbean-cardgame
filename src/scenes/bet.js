import Phaser, { Game } from 'phaser';
import { configWidth, configHeight } from '../assets/helper/gameStateVariables';
import { calculateBalance } from '../assets/helper/balance';
let gameState = { changeScene : '' };

class bet extends Phaser.Scene {
  constructor(){
		super({ key: 'bet' })
  }

  init(data) {
    this.balance = data.balance;
    this.deckIndex = data.deckIndex;
    this.shuffledDeck = data.shuffledDeck
  }
  
  create() {
    this.add.image(configWidth / 2, configHeight / 2, 'bg');

    const quitButton = this.add.image(configWidth - 50, 25, 'quit').setScale(0.12).setAlpha(0.5).setInteractive();
    quitButton.on('pointerover', function () {
      quitButton.alpha = 1;
    });
    quitButton.on('pointerout', function () {
      quitButton.alpha = 0.5;
    });
    quitButton.on('pointerdown', function () {
      location.reload();
      gameState.changeScene = 'intro';
    });

    this.add.text((configWidth / 2) - 350, (configHeight / 2) - 250, `Your balance: $${this.balance}`, {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center"
    });

    this.chips = calculateBalance(this.balance);
    let x = 0;
    let ytemp = 0;
    if (this.chips.purple > 0) {
      x == 0 ? x = 60 : x += 100;
      ytemp = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.purple; i++) {
        this.add.image(x, ytemp, 'purplechip').setScale(0.15);
        ytemp -= 20;
      }
    }
    if (this.chips.black > 0) {
      x == 0 || x == 60 ? x = 60 : x += 100;
      let y;
      this.chips.purple > 0 ? y = ytemp: y = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.black; i++) {
        this.add.image(x, y, 'blackchip').setScale(0.15);
        y -= 20;
      }
    }
    if (this.chips.green > 0) {
      x == 0 ? x = 60 : x += 100;
      let y = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.green; i++) {
        this.add.image(x, y, 'greenchip').setScale(0.15);
        y -= 20;
      }
    }
    if (this.chips.red > 0) {
      x == 0 ? x = 60 : x += 100;
      let y = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.red; i++) {
        this.add.image(x, y, 'redchip').setScale(0.15);
        y -= 20;
      }
    }
    if (this.chips.blue > 0) {
      x == 0 ? x = 60 : x += 100;
      let y = (configHeight / 2) + 150;
      for (let i = 0; i < this.chips.blue; i++) {
        this.add.image(x, y, 'bluechip').setScale(0.15);
        y -= 20;
      }
    }

    let y = (configHeight / 2) + 150; //50 cents will stack on top on ones if they exsist
    if (this.chips.white > 0) {
      x == 0 ? x = 60 : x += 100;
      for (let i = 0; i < this.chips.white; i++) {
        this.add.image(x, y, 'whitechip').setScale(0.15);
        y -= 20;
      }
    }
    if (this.chips.tan > 0) {
      x == 0 ? x = 60 : x += 100;
      for (let i = 0; i < this.chips.tan; i++) {
        this.add.image(x, y, 'fiftycents').setScale(0.15);
        y -= 20;
      }
    }

    this.add.text((configWidth / 2) + 60, (configHeight / 2) - 250, 'Select chips to add to your bet', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
      wordWrap: { width: 300, useAdvancedWrap: true }
    });


    const wc = this.add.sprite((configWidth / 2) + 200, (configHeight / 2) - 150, 'whitechip').setScale(0.15).setInteractive();
    const bc = this.add.image((configWidth / 2) + 200, (configHeight / 2) - 75, 'bluechip').setScale(0.15).setInteractive();;
    const rc = this.add.image((configWidth / 2) + 200, (configHeight / 2) , 'redchip').setScale(0.15).setInteractive();;
    const gc = this.add.image((configWidth / 2) + 200, (configHeight / 2) + 75, 'greenchip').setScale(0.15).setInteractive();;
    const blc = this.add.image((configWidth / 2) + 200, (configHeight / 2) + 150, 'blackchip').setScale(0.15).setInteractive();;
    
    wc.alpha = 0.5;
    bc.alpha = 0.5;
    rc.alpha = 0.5;
    gc.alpha = 0.5;
    blc.alpha = 0.5;

    gameState.updateAmount = false;
    let b = this.balance;
    //white chip
    gameState.betAmount = 15;
    wc.on('pointerover', function () {
      wc.alpha = 1;
    });
    wc.on('pointerout', function () {
      wc.alpha = 0.5;
    });
    wc.on('pointerdown', function () {
      if (gameState.betAmount + 1 <= b && gameState.betAmount + 1 <= 200) {
        gameState.betAmount += 1;
        gameState.updateAmount = true;
        this.scene.sound.add("coin").play();
      } else {
        this.scene.sound.add("error").play();
      }
    });

    //blue chip
    bc.on('pointerover', function () {
      bc.alpha = 1;
    });
    bc.on('pointerout', function () {
      bc.alpha = 0.5;
    });
    bc.on('pointerdown', function () {
      if (gameState.betAmount + 2 <= b && gameState.betAmount + 2 <= 200) {
        gameState.betAmount += 2;
        gameState.updateAmount = true;
        this.scene.sound.add("coin").play();
      } else {
        this.scene.sound.add("error").play();
      }
    });

    //red chip
    rc.on('pointerover', function () {
      rc.alpha = 1;
    });
    rc.on('pointerout', function () {
      rc.alpha = 0.5;
    });
    rc.on('pointerdown', function () {
      if (gameState.betAmount + 5 <= b && gameState.betAmount + 5 <= 200) {
        gameState.betAmount += 5;
        gameState.updateAmount = true;
        this.scene.sound.add("coin").play();
      } else {
        this.scene.sound.add("error").play();
      }
    });

    //green chip
    gc.on('pointerover', function () {
      gc.alpha = 1;
    });
    gc.on('pointerout', function () {
      gc.alpha = 0.5;
    });
    gc.on('pointerdown', function () {
      if (gameState.betAmount + 25 <= b && gameState.betAmount + 25 <= 200) {
        gameState.betAmount += 25;
        gameState.updateAmount = true;
        this.scene.sound.add("coin").play();
      } else {
        this.scene.sound.add("error").play();
      }
    });

    //black chip
    blc.on('pointerover', function () {
      blc.alpha = 1;
    });
    blc.on('pointerout', function () {
      blc.alpha = 0.5;
    });
    blc.on('pointerdown', function () {
      if (gameState.betAmount + 100 <= b && gameState.betAmount + 100 <= 200) {
        gameState.betAmount += 100;
        gameState.updateAmount = true;
        this.scene.sound.add("coin").play();
      } else {
        this.scene.sound.add("error").play();
      }
    });

    this.betText = this.add.text((configWidth / 2) - 20, configHeight - 60, `$${gameState.betAmount}`, {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    });

    //Bet button effects
    let betB = this.add.image((configWidth / 2) - 150, configHeight - 50, 'betButton').setScale(0.12).setInteractive();
    betB.on('pointerover', function () {
      betB.setScale(0.15);
    });
    betB.on('pointerout', function () {
      betB.setScale(0.12);
    });
    betB.on('pointerdown', function () {
      //change scene
      gameState.changeScene = 'deal';
    });
    this.add.text((configWidth / 2) - 170, configHeight - 60, 'Bet', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    });

    //Clear button effects
    let clearB = this.add.image((configWidth / 2) + 150, configHeight - 50, 'clearButton').setScale(0.12).setInteractive();
    clearB.on('pointerover', function () {
      clearB.setScale(0.15);
    });
    clearB.on('pointerout', function () {
      clearB.setScale(0.12);
    });
    clearB.on('pointerdown', function () {
      gameState.betAmount = 15;
      gameState.updateAmount = true;
    });
    this.add.text((configWidth / 2) + 114, configHeight - 60, 'Clear', {
      fill: "#ffffff",
      fontSize: "24px",
      align: "center",
    });

  }

  update() {
    if (gameState.updateAmount) {
      this.betText.destroy();
      this.betText = this.add.text((configWidth / 2) - 20, configHeight - 60, `$${gameState.betAmount}`, {
        fill: "#ffffff",
        fontSize: "24px",
        align: "center",
      });
      gameState.updateAmount = false;
    }

    if(gameState.changeScene == 'deal') {
      this.scene.sleep("bet");
      gameState.changeScene = '';
      this.scene.start("deal", {
        balance : this.balance,
        betAmount : gameState.betAmount,
        deckIndex : this.deckIndex,
        shuffledDeck : this.shuffledDeck
      });
    } else if(gameState.changeScene == 'intro') {
      gameState.changeScene = '';
      this.scene.sleep("bet");
      this.scene.start("intro");
    }
  }
   
}

export default bet;