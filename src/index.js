import Phaser from 'phaser';
import preloader from './scenes/preloader';
import intro from './scenes/intro';
import bet from './scenes/bet';
import deal from './scenes/deal';
import outcome from './scenes/outcome';
import gameover from './scenes/gameover';
import newShoe from './scenes/newShoe';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    } 
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [preloader, intro, bet, deal, outcome, gameover, newShoe],
    autoCenter: true,
    parent: "mygame"
};

const game = new Phaser.Game(config);