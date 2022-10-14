import { Player } from './player.js'
import { InputHandler } from './input.js'

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.player = new Player(this)
      // Above is as we have just imported Player class,..
      // ..with this argument -> the Game class itself
      this.input = new InputHandler()
    }
    update() {
      this.player.update(this.input.keys)
    }
    draw(context) {
      this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height)
  console.log(game);

  (function animate() {
    // clear canvas each time we update and draw:
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // then we can update & draw the new
    game.update()
    game.draw(ctx)
    requestAnimationFrame(animate)
  })()

});
