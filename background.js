class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update(){
    if (this.x < -this.width) this.x = 0 // image back to original position
    else this.x -= this.game.speed * this.speedModifier // move image
  }
  draw(context) {
    context.drawImage(
      this.image, // image we want to draw
      this.x, this.y, // where to draw it
      this.width, this.height // width and height of that image
    );
    context.drawImage(
      this.image, // image we want to draw
      this.x + this.width, this.y, // where to draw it
      this.width, this.height // width and height of that image
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1image = document.getElementById('layer1');
    this.layer2image = document.getElementById('layer2');
    this.layer3image = document.getElementById('layer3');
    this.layer4image = document.getElementById('layer4');
    this.layer5image = document.getElementById('layer5');
    this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image)
    this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image)
    this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image)
    this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image)
    this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image)
    this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5]
  }
  update(){
    this.backgroundLayers.forEach(layer => layer.update())
  }
  draw(context){
    this.backgroundLayers.forEach(layer => layer.draw(context))
  }
}
