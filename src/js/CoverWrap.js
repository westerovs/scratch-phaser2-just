export default class CoverWrap {
  constructor({
      game,
      spriteKey,
      x,
      y
    }) {
    this.game = game
    this.spriteKey = spriteKey
    this.x = x
    this.y = y
    this.innerCover = null
    this.coverWrap  = null
  
    this.MIN_ALPHA_RATIO = 0.5
    this.finish = false
    
    this.init()
  }

  init() {
    this.#createInnerCover()
    this.#createCoverWrap()
  }
  
  update() {
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
    this.innerCover = this.game.add.image(this.x, this.y, this.spriteKey)
  }
  
  #createCoverWrap = () => {
    this.coverWrap = this.game.add.bitmapData(200, 200)
    this.coverWrap.x = this.x
    this.coverWrap.y = this.y
    
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
