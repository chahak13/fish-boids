// Predator class
function Predator(x, y){
  this.mass = 1.0;
  this.position = createVector(x,y);
  this.velocity = createVector(random(-1,1),random(-1,1));
  this.r = 2.0;
  this.maxSpeed = 2.0;
  this.maxForce = 0.05;
}


Predator.prototype.velocityCohesion = function (boid) {
  var neighbordist = 50;
  var movementFactor = 1;
  var nearbyBoids = 0;
  var perceivedCenterOfMass = createVector(0,0);
  for (b of flock.boids) {
    var distance = boid.position.dist(b.position)
    if (distance != 0 && distance < neighbordist ) {
      perceivedCenterOfMass.add(b.position);
      nearbyBoids++;
    }
  }

  if(nearbyBoids>0){
    perceivedCenterOfMass.div(nearbyBoids);
    velocity = p5.Vector.sub(perceivedCenterOfMass,boid.position);
    velocity.normalize();
    velocity.mult(boid.maxSpeed);
    velocity.sub(boid.velocity);
    return velocity.limit(this.maxForce);
  }
  else{
    return createVector(0,0);
  }
}

Predator.prototype.velocitySeparation = function (boid) {
  var limitingDistance = 30.0;
  var limitingPosition = createVector(0,0);
  var nearbyBoids = 0;
  for (b of flock.boids) {
    var distance = boid.position.dist(b.position);
    if (distance != 0 && distance < limitingDistance ){
        var diff = p5.Vector.sub(boid.position,b.position);
        limitingPosition.add(diff.normalize().div(distance));
        nearbyBoids++;
      }
    }

  if(nearbyBoids){
    limitingPosition.div(nearbyBoids);
  }

  if(limitingPosition.mag()){
    limitingPosition.normalize().mult(boid.maxSpeed).sub(boid.velocity).limit(boid.maxForce);
  }
  return limitingPosition
}


Predator.prototype.velocityAlignment = function(boid) {
  var neighbordist = 50;
  var movementFactor = 1;
  var perceivedVelocity = createVector(0,0);
  var nearbyBoids = 0;
  for (b of flock.boids) {
    var distance = boid.position.dist(b.position);
    if (distance != 0 && distance < neighbordist) {
      perceivedVelocity.add(b.velocity);
      nearbyBoids++;
    }
  }
  if (nearbyBoids) {
    perceivedVelocity.div(nearbyBoids);
    perceivedVelocity.normalize();
    perceivedVelocity.mult(boid.maxSpeed);
    velocity = p5.Vector.sub(perceivedVelocity,(boid.velocity));
    return velocity.limit(boid.maxForce);
  }
  else{
    return createVector(0,0);
  }
}


Predator.prototype.update = function () {

  var lockingVelocity = this.lockPredator();
  // console.log(nearestBoid);
  //
  // nearestBoid.normalize().mult(this.maxSpeed);
  //
  // var acceleration = p5.Vector.sub(nearestBoid, this.velocity);
  //
  this.velocity.add(lockingVelocity).limit(this.maxSpeed);
  this.position = this.position.add(this.velocity);


};

Predator.prototype.lockPredator = function () {

  var neighbordist = 200;
  var averageBoid = createVector(0,0);
  var nearbyBoids = 0;

  for (b of flock.boids) {
    var distance = p5.Vector.dist(this.position, b.position);
    if (distance < neighbordist) {
      averageBoid.add(b.position);
      nearbyBoids++;
    }
  }

  if (nearbyBoids) {
    averageBoid.div(nearbyBoids);
    var desired = p5.Vector.sub(averageBoid, this.position);
    return desired.limit(this.maxForce);
  }
  return createVector(0,0);
}

Predator.prototype.repelForce = function(predatorLocation) {
  var safeDistance = 50;
  var futurePosition = p5.Vector.add(this.position, this.velocity);
  var distance = p5.Vector.dist(predatorLocation, futurePosition);

  if (distance <= safeDistance) {
    repelVector = p5.Vector.sub(this.position, predatorLocation);
    repelVector.normalize();
    if (distance != 0) {
      repelVector.mult(this.maxForce*5);
      if (repelVector.mag()<0) {
        repelVector.y = 0;
      }
    }
    return repelVector;
  }

  return createVector(0,0);
}

Predator.prototype.borders = function() {
  // console.log('It does Wraparound')
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width +this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
}

Predator.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill('rgb(255,0,0)');
  stroke(255,0,0);
  push();
  translate(this.position.x,this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape(CLOSE);
  // ellipse(0,0,this.r, this.r)
  pop();
}
