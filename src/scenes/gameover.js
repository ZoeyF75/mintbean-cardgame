class gameover extends Phaser.Scene {
  constructor(){
		super({ key: 'gameover' })
  }
  
  create() {
    //as seen in phaser3 pixel wave example
     this.cameras.main.setBackgroundColor('#ffffff');
      const source = this.textures.get('gameover').source[0].image;
      const canvas = this.textures.createCanvas('pad', 38, 42).source[0].image;
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(source, 0, 0);

      const imageData = ctx.getImageData(0, 0, 38, 42);

      let x = 0;
      let y = 0;
      const color = new Phaser.Display.Color();

      for (var i = 0; i < imageData.data.length; i += 4)
      {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];

        if (a > 0)
        {
          const startX = Phaser.Math.Between(0, 1024);
          const startY = Phaser.Math.Between(0, 768);

          const dx = 160 + x * 13;
          const dy = 45 + y * 13;

          const image = this.add.image(startX, startY, 'pixel').setScale(0);

          color.setTo(r, g, b, a);

          image.setTint(color.color);

          this.tweens.add({

            targets: image,
            duration: 2000,
            x: dx,
            y: dy,
            scaleX: 1,
            scaleY: 1,
            angle: 360,
            delay: i / 1.5,
            yoyo: true,
            repeat: -1,
            repeatDelay: 6000,
            hold: 6000

          });
        }

        x++;

        if (x === 38)
        {
          x = 0;
          y++;
        }
    }
  }
}

export default gameover;