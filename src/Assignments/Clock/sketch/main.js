let clockImg;
let clockbgImg;
let clock;
let runFrames = [];
let runner;
let assignmentImg;
let assignment;
const maxAssign = 10;
let font;
let bgMorning, bgDay, bgEvening, bgNight;

function preload() {
  runFrames[0] = loadImage("assets/run1.png");
  runFrames[1] = loadImage("assets/run2.png");
  runFrames[2] = loadImage("assets/run3.png");
  runFrames[3] = loadImage("assets/run4.png");
  runFrames[4] = loadImage("assets/run5.png");
  runFrames[5] = loadImage("assets/run6.png");

  assignmentImg = loadImage("assets/assignment.png");
  clockImg = loadImage("assets/clock.png");
  clockbgImg = loadImage("assets/clockbg.png");

  bgMorning = loadImage("assets/bg1.png");
  bgDay = loadImage("assets/bg2.png");
  bgEvening = loadImage("assets/bg3.png");
  bgNight = loadImage("assets/bg4.png");

  font = loadFont("assets/font/DungGeunMo.woff");
}

function setup() {
  createCanvas(800, 1000);
  angleMode(DEGREES);
  textFont(font);
  textSize(32);

  clock = new Clock(width / 2, height / 2 + 200, 400, clockImg, clockbgImg);
  runner = new Runner(240, runFrames);
  assignment = new Assignment(width / 2 - 275, height / 2 - 220, assignmentImg);
}

function draw() {
  let bg = changeBackground();
  image(bg, 0, 0, width, height);

  push();
  fill("#00000060");
  noStroke();
  rect(0, 0, width, 200);
  pop();

  clock.update(assignment.stack);
  clock.display();

  runner.updatePhysics(assignment.stack);
  runner.display(clock.x, clock.y);

  assignment.update();
  assignment.display();

  textFont(font);
  textAlign(LEFT);
  fill("white");

  textSize(24);
  text("과제를 해치우자!", 30, 50);

  textSize(20);
  text("→ : 직진\n↑ : 점프\n\n", 30, 100);

  textSize(20);
  text(
    "시계 바늘은 장애물!\n" + "점프하지 않으면 앞으로 갈 수 없어요\n\n",
    150,
    100
  );

  textSize(20);
  text("시계 한 바퀴 = 과제 -1", 550, 50);

  textSize(18);
  text("→ 키를 눌러 시작하세요", 30, 170);
}

function changeBackground() {
  let h = hour();

  if (h >= 6 && h < 12) {
    return bgMorning;
  } else if (h >= 12 && h < 18) {
    return bgDay;
  } else if (h >= 18 && h < 20) {
    return bgEvening;
  } else {
    return bgNight;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && runner.y === 0) {
    runner.applyForce(-7);
  }

  if (keyCode === RIGHT_ARROW) {
    let blocked = false;

    if (isNear(runner.angle, clock.hourAngle) && runner.y === 0) {
      blocked = true;
    }

    if (isNear(runner.angle, clock.minAngle) && runner.y === 0) {
      blocked = true;
    }

    if (isNear(runner.angle, clock.secAngle) && runner.y === 0) {
      blocked = true;
    }

    if (!blocked) {
      runner.move();
    }
  }

  if (runner.clickCount >= 60) {
    assignment.reduce();
    runner.clickCount = 0;
  }
}

function isNear(angleR, angleC, range = 6) {
  let diff = abs(angleR - angleC) % 360;
  if (diff > 180) diff = 360 - diff;
  return diff < range;
}
