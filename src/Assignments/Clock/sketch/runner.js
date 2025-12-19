class Runner {
  constructor(radius, frames) {
    this.radius = radius;
    this.frames = frames;
    this.angle = 0;
    this.state = 0;
    this.clickCount = 0;

    this.y = 0;
    this.velY = 0;
    this.accY = 0;
    this.gravity = 0.4;

    this.isFalling = false;
  }

  applyForce(force) {
    this.accY += force;
  }

  updatePhysics(assignmentStack) {
    if (assignmentStack >= 10) {
      this.isFalling = true;
    }

    if (this.isFalling) {
      this.applyForce(this.gravity * 5);
    } else {
      this.applyForce(this.gravity);
    }

    this.velY += this.accY;
    this.y += this.velY;

    if (!this.isFalling && this.y > 0) {
      this.y = 0;
      this.velY = 0;
    }

    this.accY = 0;
  }

  move() {
    if (!this.isFalling) {
      this.angle += 6;
      this.angle %= 360;
      this.state = (this.state + 1) % this.frames.length;
      this.clickCount++;

      if (this.angle === 0) {
        this.showText = true;
        this.textTimer = 60;
      }
    }
  }

  display(cx, cy) {
    push();
    translate(cx, cy + this.y);
    rotate(this.angle);
    translate(0, -this.radius);
    imageMode(CENTER);
    image(this.frames[this.state], 0, 0, 70, 100);

    fill("#1b1b1b");
    textAlign(CENTER);
    textSize(28);
    text(this.clickCount, 0, -60);
    pop();
  }
}
