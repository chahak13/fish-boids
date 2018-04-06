// Predator class
function Predator(x, y){
  this.position = createVector(x,y);
  this.velocity = createVector(random(-1,1),random(-1,1));
  this.r = 3.0;
  this.maxSpeed = 3.0;
  this.maxForce = 0.05;
}

Predator.prototype.velocityCohesion = function (boid, boidNumber) {
  var neighbordist = 50;
  var movementFactor = 1;
  var nearbyBirds = 0;
  var perceivedCenterOfMass = createVector(0,0);
  for (var i = 0; i < flock.boids.length; i++) {
    var distance = boid.position.dist(flock.boids[i].position)
    // var distance = p5.Vector.dist(this.position,flock.boids[i].position);
    if (distance != 0 && distance < neighbordist ) {
      perceivedCenterOfMass.add(flock.boids[i].position);
      nearbyBirds++;
    }
  }

  if(nearbyBirds>0){
    perceivedCenterOfMass.div(nearbyBirds);
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

Predator.prototype.velocitySeparation = function (boid, boidNumber) {
  var limitingDistance = 30.0;
  var limitingPosition = createVector(0,0);
  var nearbyBirds = 0;
  for (var i = 0; i < flock.boids.length; i++) {
    var distance = boid.position.dist(flock.boids[i].position);
    if (distance != 0 && distance < limitingDistance ){
        var diff = p5.Vector.sub(boid.position,flock.boids[i].position);
        limitingPosition.add(diff.normalize().div(distance));
        nearbyBirds++;
      }
    }

  if(nearbyBirds){
    limitingPosition.div(nearbyBirds);
  }

  if(limitingPosition.mag()){
    limitingPosition.normalize().mult(boid.maxSpeed).sub(boid.velocity).limit(boid.maxForce);
  }
  return limitingPosition
}


Predator.prototype.velocityAlignment = function(boid, boidNumber) {
  var neighbordist = 50;
  var movementFactor = 1;
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
    perceivedVelocity.normalize();
    perceivedVelocity.mult(boid.maxSpeed);
    // perceivedVelocity.sub(boid.velocity);
    velocity = p5.Vector.sub(perceivedVelocity,(boid.velocity));
    return velocity.limit(boid.maxForce);
  }
  else{
    return createVector(0,0);
  }
}


Predator.prototype.update = function (boidNumber) {
  var cohesionCoefficient = 1.0;
  var separationCoefficient = 1.5;
  var alignmentCoefficient = 1.5;
  v1 = this.velocityCohesion(this, boidNumber).mult(cohesionCoefficient);
  v2 = this.velocitySeparation(this, boidNumber).mult(separationCoefficient);
  v3 = this.velocityAlignment(this, boidNumber).mult(alignmentCoefficient);
  this.position = this.position.add(this.velocity);

};

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
