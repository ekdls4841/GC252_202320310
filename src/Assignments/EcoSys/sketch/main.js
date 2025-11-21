let animalsV = [];
let animalsA = [];
const animalCount = 5;

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < animalCount; i++) {
    let v = new Vehicle(
      random(width),
      random(height),
      2 + random(0.5),
      0.05 + random(0.02)
    );
    let a = new Animal(
      v.pos.x,
      v.pos.y,
      20,
      [radians(170), radians(190)],
      [30, 25, 20, 15]
    );

    animalsV.push(v);
    animalsA.push(a);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < animalCount; i++) {
    let v = animalsV[i];
    let a = animalsA[i];
    let targetV = animalsV[(i + 1) % animalCount];

    v.pursue(targetV, 30);
    v.wander();
    v.update();
    a.setHeadPos(v.pos);
    a.update();
    a.showBodyShape();
    a.showEyes();
  }
}
