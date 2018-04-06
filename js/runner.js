// The flock of boids
var flock;
var predatorFlock;
var rangeSlider;
var canvas;
var totalBoids=0;
var totalPredators = 0;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setup() {
  canvas = createCanvas(600, 400);
  centerCanvas();
  flock = new Flock();
  predatorFlock = new Flock();

  for (var i = 0; i < 10; i++) {
    totalBoids ++;
    var boid = new Boid(width/2 + 10*i, height/2 + 10*i);
    console.log('i: '+i+' position: '+boid.position)
    flock.addBoid(boid);
    // boid.render()
  }
  for (var i = 0; i < 1; i++) {
    totalPredators ++;
    var boid = new Predator(width/2 + 10*i, height/2 + 10*i);
    console.log('i: '+i+' position: '+boid.position)
    predatorFlock.addBoid(boid);
    // boid.render()
  }

}

function draw() {
  background(253, 233, 103);
  flock.moveBoids();
  predatorFlock.moveBoids();

  if (mouseIsPressed){
    if (mouseButton == CENTER){
      totalPredators++;
      var predator = new Predator(mouseX, mouseY);
      predatorFlock.addBoid(predator);
    }
    else if (mouseButton == LEFT) {
      totalBoids++;
      flock.addBoid(new Boid(mouseX,mouseY));
    }
  }
}
