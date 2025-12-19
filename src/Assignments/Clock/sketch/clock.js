class Clock {
  constructor(x, y, size, img, bgImg) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;
    this.bgImg = bgImg;

    this.shakeOffset = 0;
  }

  update(assignmentStack) {
    this.h = hour();
    this.m = minute();
    this.s = second();

    this.h % 12 === 0 ? this.h + 12 : this.h % 12;

    this.secAngle = this.s * 6;
    this.minAngle = this.m * 6 + this.s * 0.1;
    this.hourAngle = this.h * 30 + this.m * 0.5;

    if (assignmentStack >= 5 && assignmentStack < 10) {
      let shake = map(assignmentStack, 5, 9, 1, 10);
      this.shakeOffset = sin(frameCount * 10) * shake;
    } else {
      this.shakeOffset = 0;
    }
  }

  display() {
    push();
    translate(this.x + this.shakeOffset, this.y + this.shakeOffset);
    angleMode(DEGREES);

    if (this.bgImg) {
      push();
      tint(255, 50);
      imageMode(CENTER);
      image(this.bgImg, 0, 0, this.size, this.size);
      pop();
    }

    if (this.img) {
      imageMode(CENTER);
      image(this.img, 0, 0, this.size, this.size);
    }

    push();
    rotate(this.hourAngle);
    stroke("#1b1b1b");
    strokeWeight(10);
    strokeCap(SQUARE);
    line(0, 0, 0, -this.size * 0.25);
    pop();

    push();
    rotate(this.minAngle);
    stroke("#1b1b1b");
    strokeWeight(6);
    strokeCap(SQUARE);
    line(0, 0, 0, -this.size * 0.3);
    pop();

    push();
    rotate(this.secAngle);
    stroke("#1b1b1b");
    strokeWeight(4);
    strokeCap(SQUARE);
    line(0, 0, 0, -this.size * 0.35);
    pop();

    pop();
  }
}
