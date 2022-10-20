/*
  1. Try to change fillStyle color, this.x, this.y
*/

export class Player {

  constructor(game) {
    this.game = game
    // based on the player.png file res:
    this.width = 100
    this.height = 91.3
    this.x = 0
    // this.y = 100
    this.y = this.game.height - this.height
    this.vy = 0 // vertical speed
    this.weight = 1
    this.image = document.getElementById('player')
    this.speed = 0
    this.maxSpeed = 10
  }

  update(input) {
    // for every animation frame, we are going to..
    // move player coordinate
    // this.x++
    // Horizontal Movement:
    this.x += this.speed
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed
    else this.speed = 0
    // Prevent go outside the boundary:
    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width
    // Vertical Movement:
    if (input.includes('ArrowUp') && this.onGround()) this.vy -= 20
    this.y += this.vy
    if (!this.onGround()) this.vy += this.weight
    else this.vy = 0 // stop all vertical movement
  }

  draw(context) {
    // context.fillStyle = 'red'
    // context.fillRect(this.x, this.y, this.width, this.height)
    context.drawImage(
      this.image, // from PNG
      0, 0, this.width, this.height, // source image
      this.x, this.y, this.width, this.height // destination canvas
    )
  }

  onGround() { // method to check whether the player is flying or on ground
    return this.y >= this.game.height - this.height
  }
}
