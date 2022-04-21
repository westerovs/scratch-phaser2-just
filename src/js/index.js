class Game {
  constructor() {
    this.game  = null
    this.innerCover = null
    this.coverWrap  = null
    this.coin  = null
  
    this.MIN_ALPHA_RATIO = 0.5
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
    this.#createInnerCover()
    this.#createCoverWrap()
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
  
  #createInnerCover = () => {
    this.innerCover = this.game.add.image(200, 200, 'greenBlock')
  }

  #createCoverWrap = () => {
    this.coverWrap = this.game.add.bitmapData(200, 200)
    this.coverWrap.x = 200
    this.coverWrap.y = 200
    
    this.coverWrap.copy('redBlock')
    
    this.coverWrap.update()
    this.coverWrap.addToWorld(this.coverWrap.x, this.coverWrap.y)
  }
  
  #clearCoverWrap = () => {
    this.coverWrap.context.clearRect(0, 0, 200, 200);
  }
  
  getAlphaRatio = () => {
    const ctx = this.coverWrap.ctx
    let alphaPixels = 0
    
    const data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data

    // чем выше число, тем быстрее происходит полная очистка
    const coefficientBrush = 4
    for (let i = 0; i < data.length; i += coefficientBrush) {
      if (data[i] > 0) alphaPixels++
    }
    
    return alphaPixels / (ctx.canvas.width * ctx.canvas.height)
  }

  #checkWin = () => {
    const alphaRatio = this.getAlphaRatio()

    if (!this.finish && alphaRatio < this.MIN_ALPHA_RATIO) {
      this.finish = true
      this.#clearCoverWrap()
      console.warn('FINISH HIM')
    }
  }
}
new Game().init()

