class Assignment {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.stack = 1;
    this.timer = 0;
  }

  reduce() {
    if (this.stack > 0) {
      this.stack--;
    }
  }

  update() {
    if (frameCount % 60 === 0) {
      this.timer++;
      if (this.timer >= 10 && this.stack < 10) {
        this.stack++;
        this.timer = 0;
      }
    }
  }

  display() {
    push();
    for (let n = 0; n < 10; n++) {
      fill("#ffffff50");
      stroke(0);
      strokeWeight(3);
      rect(this.x + n * 60 - 25, this.y - 25, 60, 60);
    }

    imageMode(CENTER);
    for (let n = 0; n < this.stack; n++) {
      image(this.img, this.x + n * 60 + 5, this.y + 5, 45, 30);
    }
    pop();
  }
}
