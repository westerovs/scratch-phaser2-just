class Game {
  constructor() {
    this.game  = null
    this.money = null
    this.coverWrap  = null
    this.coin  = null
  
    this.MIN_ALPHA_RATIO = 0.6
    this.finish = false
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
    this.game.load.image('greenBlock', '/src/img/block2.png')
  }

  create = () => {
    this.game.stage.backgroundColor = '#000000'
    this.#createMoney()
    this.#createCoverWrap()
    // this.#createBrush()
  }
  
  update = () => {
    this.#onTouchStart()
    
    this.#checkWin()
  }
  
  #onTouchStart = () => {
    if (this.game.input.activePointer.isDown) {
      let x = Math.floor(this.game.input.x - this.coverWrap.x)
      let y = Math.floor(this.game.input.y - this.coverWrap.y)
      const rgba = this.coverWrap.getPixel(x, y)
    
      if (rgba.a > 0) {
        this.coverWrap.blendDestinationOut()
        this.coverWrap.circle(x, y, 16, 'rgba(0, 0, 0, 255')
        this.coverWrap.blendReset()
        this.coverWrap.dirty = true
      }
    }
  }
  
  #createMoney = () => {
    this.money = this.game.add.image(200, 200, 'greenBlock')
    // this.money.create(200, 200, 'money')
    // this.money.setAll('anchor.x', 0.5)
    // this.money.setAll('anchor.y', 0.5)
  }

  #createCoverWrap = () => {
    this.coverWrap = this.game.add.bitmapData(200, 200)
    this.coverWrap.x = 200
    this.coverWrap.y = 200
    
    this.coverWrap.context.fillStyle = 'brown'
    this.coverWrap.context.fillRect(0, 0, 500, 200)
    this.coverWrap.ctx.fillStyle = "blue"
    this.coverWrap.ctx.font = '35px san-serif'
    
    const textString = 'Потри меня!'
    const textWidth = this.coverWrap.ctx.measureText(textString).width
    this.coverWrap.ctx.fillText(textString, (this.coverWrap.width / 2) - (textWidth / 2), 120)
  
    // this.coverWrap.copy('redBlock');
    
    this.coverWrap.update()
    this.coverWrap.addToWorld(this.coverWrap.x, this.coverWrap.y)
  }
  
  #clearAllCoverWrap = () => {
    this.coverWrap.context.clearRect(0, 0, 200, 200);
  }
  
  #createBrush = () => {
    this.coin = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'redBlock')
    this.coin.anchor.setTo(0.1, 0.5)
    this.game.physics.enable(this.coin, Phaser.Physics.ARCADE)
  }

  alphaRatio = (ctx) => {
    let alphaPixels = 0
    
    let data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 0) alphaPixels++
    }

    return alphaPixels / (ctx.canvas.width * ctx.canvas.height)
  }

  #checkWin = () => {
    if (!this.finish && this.alphaRatio(this.coverWrap.ctx) < this.MIN_ALPHA_RATIO) {
      this.finish = true
      this.#clearAllCoverWrap()
      console.log('')
      console.warn("You Win! :D")
    }
  }
}
new Game().init()

