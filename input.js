export class InputHandler {
  constructor() {
    // for keyboard:
    this.keys = [];
    window.addEventListener('keydown', e => {
      if (( e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter'
          ) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key)
      }
      // console.log(e.key, `[${this.keys}]`)
    })
    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'Enter') {
        this.keys.splice(this.keys.indexOf(e.key), 1)
      }
      // console.log(e.key, `[${this.keys}]`)
    })

    // for mobile devices:
    this.duration = 0
    this.xPos = []
    this.yPos = []
    window.addEventListener('touchstart', e => {
      this.duration = e.timeStamp
      // console.log(e.type)
    })
    window.addEventListener('touchend', e => {
      this.duration = e.timeStamp - this.duration
      this.xPos.length = 0
      this.yPos.length = 0
      this.keys.splice(this.keys.indexOf(e.key), 1)
      // console.log(e.type, `| duration = ${this.duration}s`)
    })
    window.addEventListener('touchmove', e => {
      this.xPos.push(e.changedTouches[0].clientX)
      this.yPos.push(e.changedTouches[0].clientY)
      // detect movement right/left and up/down
      const xDistance = this.xPos[this.xPos.length - 1] - this.xPos[this.xPos.length - 2]
      const yDistance = this.yPos[this.yPos.length - 1] - this.yPos[this.yPos.length - 2]
      if (xDistance > 0) {
        this.keys.splice(this.keys.indexOf(e.key), 1)
        this.keys.push('ArrowRight')
      } else if (xDistance < 0) {
        this.keys.splice(this.keys.indexOf(e.key), 1)
        this.keys.push('ArrowLeft')
      }
      // console.log(xDistance > 0 ? 'right' : 'left')
      // console.log(yDistance > 0 ? 'down' : 'up')
    })
  }
}
