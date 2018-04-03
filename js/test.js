// The flock of boids
var flock;

function setup() {
  createCanvas(1300, 590);
  flock = new Flock();

  // for (var i = 0; i < 10; i++) {
    var boid = new Boid(width/2, height/2);
    flock.addBoid(boid);
  // }
}

function draw() {
  background(0);
  flock.moveBoids();
}

function mouseDragged() {
  flock.addBoid(new Boid(mouseX,mouseY));
}

// Flock class consisting of multiple boids
function Flock(){
  this.boids = [];
}

// Method of the Flock class to add a new boid to the flock
Flock.prototype.addBoid = function(boid){
  this.boids.push(boid)
}

Flock.prototype.moveBoids = function(){
  console.log('Reached moveBoids with '+this.boids.length+ 'boids')
  for (var i = 0; i < this.boids.length; i++) {

    this.boids[i].update(i);
    this.boids[i].borders();
    this.boids[i].render();
  }

}

// Boid class
function Boid(x, y){
  this.position = createVector(x,y);
  this.velocity = createVector(random(-1,1), random(-1,1));
  this.r = 2.0;
  this.maxSpeed = 2.0;
}

Boid.prototype.velocityCohesion = function (boid, boidNumber) {
  var neighbordist = 50;
  var movementFactor = 100;
  var nearbyBirds = 0;
  var perceivedCenterOfMass = createVector(0,0)
  for (var i = 0; i < flock.boids.length; i++) {
    var distance = boid.position.dist(flock.boids[i].position)
    if (distance != 0 && distance < neighbordist ) {
      perceivedCenterOfMass.add(flock.boids[i].position);
      nearbyBirds++;
    }
  }

  if(nearbyBirds>0){
    perceivedCenterOfMass.div(nearbyBirds);
    velocity = perceivedCenterOfMass.sub(boid.position).div(movementFactor);
    return velocity.limit(0.01);
  }
  else{
    return createVector(0,0);
  }
}

Boid.prototype.velocitySeparation = function (boid, boidNumber) {

  var limitingDistance = 25.0;
  var limitingPosition = createVector(0,0);
  for (var i = 0; i < flock.boids.length; i++) {
    var distance = boid.position.dist(flock.boids[i].position);
    if (distance != 0 && distance < limitingDistance){
        limitingPosition.sub(flock.boids[i].position.sub(boid.position));
      }
    }

  return limitingPosition
}

Boid.prototype.velocityAlignment = function(boid, boidNumber) {
  var neighbordist = 50;
  var movementFactor = 8;
  var perceivedVelocity = createVector(0,0);
  var nearbyBirds = 0;
  for (var i = 0; i < flock.boids.length; i++) {
    var distance = boid.position.dist(flock.boids[i].position);
    if (distance != 0 && distance < neighbordist) {
      perceivedVelocity.add(flock.boids[i].velocity);
      nearbyBirds++;
    }
  }
  if (nearbyBirds) {
    perceivedVelocity.div(nearbyBirds);
    velocity = perceivedVelocity.sub(boid.velocity).div(movementFactor);

    return velocity;
  }
  else{
    return createVector(0,0);
  }
}


Boid.prototype.update = function (boidNumber) {
  v1 = this.velocityCohesion(this, boidNumber);
  v2 = this.velocitySeparation(this, boidNumber);
  v3 = this.velocityAlignment(this, boidNumber);

  this.velocity = this.velocity.add(v1).add(v2).add(v3);
  this.velocity.limit(this.maxSpeed);
  this.position = this.position.add(this.velocity);

};

Boid.prototype.borders = function() {
  // console.log('It does Wraparound')
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width +this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
  // if (this.position.x < -this.r)  this.position.x = -this.position.x;
  // if (this.position.y < -this.r)  this.position.y = -this.position.y;
  // if (this.position.x > width +this.r) this.position.x = -this.position.x;
  // if (this.position.y > height+this.r) this.position.y = -this.position.y;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(200);
  push();
  translate(this.position.x,this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape(CLOSE);
  pop();
}
