import { Player } from './player.js'
import { InputHandler } from './input.js'
import { Background } from './background.js'
import {
  FlyingEnemy,
  ClimbingEnemy,
  GroundEnemy,
} from './enemies.js'
import { UI } from './UI.js'


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
      this.input = new InputHandler(this)
      // UI:
      this.UI = new UI(this);
      // Enemies:
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      // Debug mode:
      this.debug = false;
      // Score:
      this.score = 0;
      this.fontColor = 'black';
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handleEnemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
      })
    }
    draw(context) {
      this.background.draw(context); // write before the player.draw so it will be behind the player on the canvas
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context)
        // remove enemy that is off screen from the array
        if (enemy.markedForDeletion) {
          this.enemies.splice(this.enemies.indexOf(enemy), 1)
        }
      })
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this))
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
      this.enemies.push(new FlyingEnemy(this));
      // console.log(this.enemies)
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
