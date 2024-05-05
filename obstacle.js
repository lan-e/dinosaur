let cactoosImage;

class Obstacle {
  constructor() {
    this.h = 50;
    this.w = 20;
    this.x = width;
    this.y = height - this.h;

    if (!cactoosImage) {
      cactoosImage = loadImage("assets/cactoos.svg");
    }

    this.image = cactoosImage;
    this.scale = random(0.8, 1.2);
  }

  move() {
    this.x -= 6;
  }

  show() {
    // keep cactoos at the bottom
    let adjustedHeight = this.h * this.scale;
    let adjustedY = height - adjustedHeight;

    push();
    translate(this.x, adjustedY);
    scale(this.scale);
    image(this.image, 0, 0, this.w, this.h);
    pop();
  }
}
