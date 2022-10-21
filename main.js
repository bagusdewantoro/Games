import { Player } from './player.js'
import { InputHandler } from './input.js'
import { Background } from './background.js'

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.groundMargin = 80
      this.speed = 0 // for background image
      this.maxSpeed = 6
      this.background = new Background(this)
      this.player = new Player(this)
      // Above is as we have just imported Player class,..
      // ..with this argument -> the Game class itself
      this.input = new InputHandler()
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
    }
    draw(context) {
      this.background.draw(context); // write before the player.draw so it will be behind the player on the canvas
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  // console.log(game);
  // control FPS:
  let lastTime = 0;


  (function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    // console.log(deltaTime)
    lastTime = timeStamp;
    // ==================================
    // clear canvas each time we update and draw:
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // then we can update & draw the new
    game.update(deltaTime)
    game.draw(ctx)
    requestAnimationFrame(animate)
    // ==================================

    // // TEST AT THE LOWER FPS: ==============
    // setTimeout(() => {
    //   // clear canvas each time we update and draw:
    //   ctx.clearRect(0, 0, canvas.width, canvas.height)
    //   // then we can update & draw the new
    //   game.update()
    //   game.draw(ctx)
    //   requestAnimationFrame(animate)
    // }, 200) // ==============================

  })(0)

});
