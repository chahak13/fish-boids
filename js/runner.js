// The flock of boids
var flock;

function setup() {
  createCanvas(1300, 590);
  flock = new Flock();

  for (var i = 0; i < 10; i++) {
    var boid = new Boid(width/2 + 10*i, height/2 + 10*i);
    console.log('i: '+i+' position: '+boid.position)
    flock.addBoid(boid);
    // boid.render()
  }
}

function draw() {
  background(253, 233, 103);
  flock.moveBoids();
}

function mouseDragged() {
  flock.addBoid(new Boid(mouseX,mouseY));
}
