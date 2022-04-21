import CoverWrap from './CoverWrap.js';

class Game {
  constructor() {
    this.game  = null
    this.init()
  
    this.coverWrap1 = null
    this.coverWrap2 = null
    this.coverWrap3 = null
  }

  init() {
    this.game = new Phaser.Game(
      1366,
      1366,
      Phaser.CANVAS,
      null,
      {
        preload: this.preload,
        create : this.create,
        update : this.update,
      })
  }

  preload() {
    this.game.stage.backgroundColor = '#FFF'
    this.game.load.image('redBlock', '/src/img/block1.png')
    this.game.load.image('mushrooms', '/src/img/mushrooms.jpg')
    this.game.load.image('carrot', '/src/img/carrot.jpg')
    this.game.load.image('tomato', '/src/img/tomato.jpg')
  }

  create = () => {
    this.game.stage.backgroundColor = '#000000'
    this.coverWrap1 = new CoverWrap({
      game: this.game,
      spriteKey: 'mushrooms',
      x: 100,
      y: 100
    })
    
    this.coverWrap2 = new CoverWrap({
      game: this.game,
      spriteKey: 'carrot',
      x: 400,
      y: 100
    })
    
    this.coverWrap3 = new CoverWrap({
      game: this.game,
      spriteKey: 'tomato',
      x: 250,
      y: 350
    })
    
  }
  
  update = () => {
    this.coverWrap1.update()
    this.coverWrap2.update()
    this.coverWrap3.update()
  }
  
}
new Game()

