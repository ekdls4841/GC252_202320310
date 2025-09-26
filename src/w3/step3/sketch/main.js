const palette = ["#DC143C", "#F75270", "#F7CAC9", "#FDEBD0"];

let ps = [];

function setup() {
  createCanvas(800, 600);

  for (let n = 0; n < 2000; n++) {
    ps.push(new Particle(0.5 * width, 0.5 * height, 30, random(1, 5), 20));
  }
}

function draw() {
  background(127);
  // for (let idx = 0; idx < ps.length; idx++) {
  //   const aParticle = ps[idx];
  //   aParticle.drawRect();
  // }
  // for (const aParticle of ps) {
  //   aParticle.drawRect();
  // }
  ps.forEach((aParticle, idx) => {
    aParticle.applyGravity(0.1);
    aParticle.update();
    aParticle.drawRect();
  });
}
