// Boid class
function Boid(x, y){
  this.mass = 1.0;
  this.position = createVector(x,y);
  this.velocity = createVector(random(-1,1),random(-1,1));
  this.r = 2.0;
  this.maxSpeed = 2.0;
  this.maxForce = 0.05;
}


Boid.prototype.velocityCohesion = function (boid) {
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

Boid.prototype.velocitySeparation = function (boid) {
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


Boid.prototype.velocityAlignment = function(boid) {
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


Boid.prototype.update = function () {

  var acceleration = createVector(0,0);

  // If predator eats the prey
  // for (var i = 0; i < predatorFlock.boids.length; i++) {
  //   if (this.position.dist(predatorFlock.boids[i].position)<50) {
  //     flock.boids.splice(flock.boids.indexOf(this),1);
  //     console.log('deleted boid '+i);
  //   }
  // }
  // if (flock.boids.length == 0) {
  //   return
  // }

  if (predatorFlock.boids.length) {
    for (predator of predatorFlock.boids) {
      predForce = this.repelForce(predator.position);
      acceleration.add(predForce);
    }
  }


  var cohesionCoefficient = 1.0;
  var separationCoefficient = 2.5;
  var alignmentCoefficient = 1.5;

  cohesionForce = this.velocityCohesion(this).mult(cohesionCoefficient);
  separationForce = this.velocitySeparation(this).mult(separationCoefficient);
  alignmentForce = this.velocityAlignment(this).mult(alignmentCoefficient);

  acceleration.add(cohesionForce);
  acceleration.add(separationForce);
  acceleration.add(alignmentForce);

  this.velocity.add(acceleration);
  this.velocity.limit(this.maxSpeed);
  this.position = this.position.add(this.velocity);


};

Boid.prototype.repelForce = function(predatorLocation) {
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

Boid.prototype.borders = function() {
  // console.log('It does Wraparound')
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width +this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill('rgba(0,0,0,0)');
  stroke(0);
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
