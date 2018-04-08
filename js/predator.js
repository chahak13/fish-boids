// Predator class
function Predator(x, y){
  this.mass = 1.0;
  this.position = createVector(x,y);
  this.velocity = createVector(random(-1,1),random(-1,1));
  this.r = 3.5;
  this.maxSpeed = 2.0;
  this.maxForce = 0.05;
}

// The velocitySeparation function returns the velocity as governed by the Collision Avoidance rule from Craig Reynolds' model
Predator.prototype.velocitySeparation = function () {
  var limitingDistance = radiusSeparationSliderValuePredator * this.r;
  var limitingPosition = createVector(0,0);
  var nearbyPredators = 0;
  for (b of predatorFlock.boids) {
    var distance = this.position.dist(b.position);
    if (distance != 0 && distance < limitingDistance ){
        var diff = p5.Vector.sub(this.position,b.position);
        limitingPosition.add(diff.normalize().div(distance));
        nearbyPredators++;
      }
    }

  if(nearbyPredators){
    limitingPosition.div(nearbyPredators);
  }

  if(limitingPosition.mag()){
    limitingPosition.normalize().mult(this.maxSpeed).sub(this.velocity).limit(this.maxForce);
  }
  return limitingPosition
}

// The update function calculates the new position and velocity of the predator
Predator.prototype.update = function () {

  var lockingVelocity = this.lockPredator();
  var separationVelocity = this.velocitySeparation();

  // Coefficient to scale the separation velocity
  var separationCoefficient = separationSliderValuePredator;

  this.velocity.add(separationVelocity.mult(separationCoefficient));
  this.velocity.add(lockingVelocity).limit(this.maxSpeed);
  this.position = this.position.add(this.velocity);
};

// lockPredator function locks the predator to the center of the nearest swarm of boids and returns the velocity vector to move the predator in that direction
Predator.prototype.lockPredator = function () {

  var neighbordist = radiusPreySliderValuePredator * this.r;
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

// This function wraps the boid around the canvas if the boid reaches the border of the canvas
Predator.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width +this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
}

// This function draws shapes of the predators on the canvas
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
