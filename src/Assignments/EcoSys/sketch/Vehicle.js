class Vehicle {
  constructor(x, y, maxSpeed = 3, maxForce = 0.2) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;

    this.wanderTheta = 0;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  pursue(targetVehicle) {
    let prediction = targetVehicle.vel.copy();
    prediction.mult(20);
    let futurePos = p5.Vector.add(targetVehicle.pos, prediction);
    return this.seek(futurePos);
  }

  evade(targetVehicle) {
    return this.pursue(targetVehicle).mult(-1);
  }

  wander() {
    let wanderRadius = 40;
    let wanderDist = 80;
    let change = 0.3;

    this.wanderTheta += random(-change, change);

    let circleLoc = this.vel.copy();
    circleLoc.setMag(wanderDist);
    circleLoc.add(this.pos);

    let circleOffset = createVector(
      wanderRadius * cos(this.wanderTheta),
      wanderRadius * sin(this.wanderTheta)
    );

    let target = p5.Vector.add(circleLoc, circleOffset);
    return this.seek(target);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}
