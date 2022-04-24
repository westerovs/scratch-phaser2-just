import CoverWrap from './CoverWrap.js';

class Game {
  constructor() {
    this.game  = null
    this.init()
  
    this.coverWrap1 = null
    this.coverWrap2 = null
    this.coverWrap3 = null
    this.coverWrap4 = null
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
    this.game.load.image('cover',  './src/img/block1.png')
    this.game.load.image('peasCover', './src/img/peas-cover.png')
  
    this.game.load.image('mushrooms', './src/img/mushrooms.jpg')
    this.game.load.image('carrot',    './src/img/carrot.jpg')
    this.game.load.image('tomato',    './src/img/tomato.jpg')
    this.game.load.image('peas',      './src/img/peas.png')
  }

  create = () => {
    this.game.stage.backgroundColor = '#000000'
    this.coverWrap1 = new CoverWrap({
      game: this.game,
      innerSpriteKey: 'mushrooms',
      cover: 'cover',
      x: 100,
      y: 100
    })
    
    this.coverWrap2 = new CoverWrap({
      game: this.game,
      spriteKey: 'carrot',
      cover: 'cover',
      x: 400,
      y: 100
    })
    
    this.coverWrap3 = new CoverWrap({
      game: this.game,
      innerSpriteKey: 'tomato',
      cover: 'cover',
      x: 250,
      y: 350
    })
    
    this.coverWrap4 = new CoverWrap({
      game: this.game,
      innerSpriteKey: 'peas',
      cover: 'peasCover',
      x: 550,
      y: 350,
      MIN_ALPHA_RATIO: 0.1
    })
  }
  
  update = () => {
    this.coverWrap1.update()
    this.coverWrap2.update()
    this.coverWrap3.update()
    this.coverWrap4.update()
  }
  
}
new Game()

