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
    this.image = document.getElementById('player')
  }
  update() {

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
}
