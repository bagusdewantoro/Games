import { Player } from './player.js'

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
      // as we have just imported Player class,
      // with this argument -> the Game class itself
    }
    update() {

    }
    draw(context) {
      this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height)
  console.log(game);

  (function animate() {
    game.draw(ctx)
    requestAnimationFrame(animate)
  })()

});
