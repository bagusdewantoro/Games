export class InputHandler {
  constructor() {

    this.keys = [];


    // for keyboard:
    window.addEventListener('keydown', e => {
      if (( e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter'
          ) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key)
      }
      // console.log(`[${this.keys}]`)
    })
    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'Enter') {
        this.keys.splice(this.keys.indexOf(e.key), 1)
      }
      // console.log(`[${this.keys}]`)
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
      this.keys.length = 0
      console.log(this.keys)
    })
    window.addEventListener('touchmove', e => {
      this.xPos.push(e.changedTouches[0].clientX)
      this.yPos.push(e.changedTouches[0].clientY)

      // detect movement right/left and up/down
      const xDistance = this.xPos[this.xPos.length - 1] - this.xPos[this.xPos.length - 2]
      const yDistance = this.yPos[this.yPos.length - 1] - this.yPos[this.yPos.length - 2]
      // right/left
      let keyX;
      if (xDistance >= 0) keyX = 'ArrowRight'
      else if (xDistance <= 0) keyX = 'ArrowLeft'
      if (( keyX === 'ArrowLeft' ||
            keyX === 'ArrowRight'
          ) && !this.keys.includes(keyX)) {
        this.keys = this.keys.filter(el => el !== 'ArrowLeft' && el !== 'ArrowRight')
        this.keys.push(keyX)
      }
      // up/down
      let keyY;
      if (yDistance > 3) keyY = 'ArrowDown'
      else if (yDistance < -3) keyY = 'ArrowUp'
      // console.log(yDistance)
      if (( keyY === 'ArrowUp' ||
            keyY === 'ArrowDown'
          ) && !this.keys.includes(keyY)) {
        this.keys = this.keys.filter(el => el !== 'ArrowUp' && el !== 'ArrowDown')
        this.keys.push(keyY)
      }
      // console.log(this.keys)
    })
  }
}
