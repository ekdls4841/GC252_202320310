const palette = ["#F5D2D2", "#F8F7BA", "#BDE3C3", "#A3CCDA"];

const ballNum = 5;
const balls = [];
const diameter = 100;
const speed = 5;
const gravity = 0.1;
const restitution = 0.5;

let hoveredBall = null;
let grabbedBall = null;

function setup() {
  createCanvas(700, 800);

  for (let n = 0; n < ballNum; n++) {
    const randomDiameter = Math.random() * 150 + 50;
    const randomSpeed = Math.random() * 9 + 1;
    const randomPaletteIdx = Math.floor(Math.random() * palette.length);
    const randomColour = palette[randomPaletteIdx];
    balls.push(new Ball(randomDiameter, randomSpeed, randomColour));
  }
}

function draw() {
  background(0);

  if (grabbedBall) {
    grabbedBall.drag(mouseX, mouseY);
  }

  balls.forEach((aBall) => {
    aBall.applyGravity();
    aBall.update();
    aBall.resolveWallCollision();
  });

  if (!grabbedBall) {
    hoveredBall = null;
    for (let idx = balls.length - 1; idx >= 0; idx--) {
      const aBall = balls[idx];
      if (aBall.isMouseInside(mouseX, mouseY)) {
        hoveredBall = aBall;
        break;
      }
    }
  }

  balls.forEach((aBall) => {
    aBall.show(aBall === hoveredBall);
    aBall.showDebug();
  });
}

function mousePressed() {
  if (keyIsPressed && key === "Shift") {
    balls.forEach((aBall) => {
      const randomSpeed = Math.random() * 9 + 1;
      aBall.init(mouseX, mouseY, randomSpeed);
    });
  } else {
    if (hoveredBall) {
      grabbedBall = hoveredBall;
      grabbedBall.grab(mouseX, mouseY);
    }
  }
}

function mouseReleased() {
  if (grabbedBall) {
    grabbedBall.ungrab();
    grabbedBall = null;
  }
}
