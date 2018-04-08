// Flock class consisting of multiple boids
function Flock(){
  this.boids = [];
}

// Method of the Flock class to add a new boid to the flock
Flock.prototype.addBoid = function(boid){
  this.boids.push(boid)
}

// This function moves the boids in the canvas
Flock.prototype.moveBoids = function(){
  if (this.boids.length != 0) {
    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].update();
      this.boids[i].borders();
      this.boids[i].render();
    }
  }

  // If prey then render ellipses
  Flock.prototype.renderEllipses = function() {
      if(this.boids.length == 0)
        return;
      stroke("#FF0000");
      noFill();
      ellipse(this.boids[0].position.x, this.boids[0].position.y, 2 * radiusCohesionSliderValuePrey, 2 * radiusCohesionSliderValuePrey);
      stroke("#00FF00");
      noFill();
      ellipse(this.boids[0].position.x, this.boids[0].position.y, 2 * radiusAlignmentSliderValuePrey, 2 * radiusAlignmentSliderValuePrey);
      stroke("#0000FF");
      noFill();
      ellipse(this.boids[0].position.x, this.boids[0].position.y, 2 * radiusSeparationSliderValuePrey, 2 * radiusSeparationSliderValuePrey);
      stroke("#000000");
  }
}
