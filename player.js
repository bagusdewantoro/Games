/*
  1. Try to change fillStyle color, this.x, this.y
*/

import { Sitting, Running, Jumping, Falling } from './playerStates.js';

export class Player {

  constructor(game) {
    this.game = game
    // based on the player.png file res:
    this.width = 100
    this.height = 91.3
    this.x = 0
    // this.y = 100
    this.y = this.game.height - this.height - this.game.groundMargin
    // player image & FPS control:
    this.image = document.getElementById('player')
    this.frameX = 0 // try change this to 1,2,3,.. !
    this.frameY = 0 // try change this to 1,2,3,.. !
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000/this.fps
    this.frameTimer = 0;
    // vertical movement:
    this.vy = 0 // vertical speed before 'ArrowUp'
    this.weight = 1
    // horizontal movement:
    this.speed = 0
    this.maxSpeed = 10
    // Player State Management:
    this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)]
    // array order above must be same with States enum in playerStates
    this.currentState = this.states[0]
    this.currentState.enter()
  }

  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input)
    // for every animation frame, we are going to move player coordinate
    // this.x++
    // Horizontal Movement:  ===============================
    this.x += this.speed
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed
    else this.speed = 0
    // Prevent go outside the boundary:
    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width
    // Vertical Movement: ==================================
    // if (input.includes('ArrowUp') && this.onGround()) {
    //   this.vy -= 20
    //   // // ===== console ======
    //   // console.log(`
    //   //   == JUMP ==
    //   //   this.onGround() = ${this.onGround()}
    //   //   this.y = ${this.y}
    //   //   this.vy = ${this.vy}
    //   //   this.weight = ${this.weight}
    //   // `)
    //   // // ====================
    // }
    this.y += this.vy
    if (!this.onGround()) {
      this.vy += this.weight
      // // ===== console ======
      // console.log(`
      //   this.onGround() = ${this.onGround()}
      //   this.y = ${this.y}
      //   this.vy = ${this.vy}
      //   this.weight = ${this.weight}
      //   this.y = ${this.y} + ${this.vy} = ${this.y + this.vy}
      // `)
      // // ====================
    }
    else this.vy = 0 // stop all vertical movement
    // ========================
    // Sprite Animation:
    // if (this.frameX < this.maxFrame) this.frameX++
    // else this.frameX = 0;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = 0
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context) {
    // if debug = true:
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
    // context.fillStyle = 'red'
    // context.fillRect(this.x, this.y, this.width, this.height)
    context.drawImage(
      // from PNG:
      this.image,
      // source image:
      this.frameX * this.width, this.frameY * this.height, this.width, this.height,
      // destination canvas:
      this.x, this.y, this.width, this.height
    )
  }

  onGround() { // method to check whether the player is flying or on ground
    return this.y >= this.game.height - this.height - this.game.groundMargin
  }

  setState(state, speed){
    this.currentState = this.states[state]
    this.game.speed = this.game.maxSpeed * speed
    this.currentState.enter()
  }

  checkCollision() {
    this.game.enemies.forEach(enemy => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        // collision detected
        enemy.markedForDeletion = true;
        this.game.score++;
        // console.log(this.game.score)
      } else {
        // no collission
      }
    })
  }
}
