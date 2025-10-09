const palette = ["#F5D2D2", "#F8F7BA", "#BDE3C3", "#A3CCDA"];

const ballNum = 5;
const balls = [];
const diameter = 100;
const speed = 5;
const gravity = 0.1;
const restitution = 0.9;

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

  balls.forEach((aBall) => {
    aBall.applyGravity();
    aBall.update();
    aBall.resoveWallCollision();
    aBall.setMouseInside(mouseX, mouseY);
    aBall.show();
    aBall.showDebug();
  });
}

function mousePressed() {
  balls.forEach((aBall) => {
    const randomSpeed = Math.random() * 9 + 1;
    aBall.init(mouseX, mouseY, randomSpeed);
  });
}
