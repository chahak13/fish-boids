// The flock of boids
var flock;
var predatorFlock;
var rangeSlider;
var canvas;
var totalBoids = 100;
var totalPredators = 0;

var canvasWidth;
var canvasHeight;

var totalColors = 2;
var greenColor;
var blueColor;
var colorsArray;

// GUI Sliders for prey
var cohesionSliderPrey;
var alignmentSliderPrey;
var separationSliderPrey;

var radiusCohesionSliderPrey;
var radiusAlignmentSliderPrey;
var radiusSeparationSliderPrey;

// GUI Slider values for prey
var cohesionSliderValuePrey;
var alignmentSliderValuePrey;
var separationSliderValuePrey;

var radiusCohesionSliderValuePrey;
var radiusAlignmentSliderValuePrey;
var radiusSeparationSliderValuePrey;

// GUI Sliders for Predator
var separationSliderPredator;
var radiusSeparationSliderPredator;
var radiusPreySliderPredator;

// GUI Slider values for Predator
var separationSliderValuePredator;
var radiusSeparationSliderValuePredator;
var radiusPreySliderValuePredator;

var controllerXPrey;
var controllerYPrey;
var controllerOffset;
var labelOffset;

var controllerXPredator;
var controllerYPredator;

var controllerXNumber;
var controllerYNumber;

// Number of predators slider
var numberOfPredatorsSlider;
var numberOfPredatorsSliderValue;

// Number of preys slider
var numberOfPreysSlider;
var numberOfPreysSliderValue;

// Color Segregation
var colorSegregationOnOffButton;
var isColorSegregationOn;
function createGUIElements() {
    var epsilon = 25;
    controllerXNumber = epsilon;
    controllerYNumber = 5;
    controllerXPrey = (1 * (windowWidth / 3.0)) + epsilon;
    controllerYPrey = 5;
    controllerOffset = 20;
    labelOffset = 15;

    // controllerXPredator = windowWidth - canvasWidth + 125;
    controllerXPredator = (2 * (windowWidth / 3.0)) + epsilon;
    controllerYPredator = 5;
    // Prey
    cohesionSliderPrey = createSlider(0, 2, 1, 0.05);
    separationSliderPrey = createSlider(0, 2, 1, 0.05);
    alignmentSliderPrey = createSlider(0, 2, 1, 0.05);

    radiusCohesionSliderPrey = createSlider(0,60,45,0.01);
    radiusAlignmentSliderPrey = createSlider(0,60,25,0.01);
    radiusSeparationSliderPrey = createSlider(0,60,12,0.01);

    preyLabel = createDiv('Prey');
    preyLabel.position(controllerXPrey + cohesionSliderPrey.width,
        controllerYPrey + 0 * controllerOffset);
    predatorLabel = createDiv('Predator');
    predatorLabel.position(controllerXPredator + cohesionSliderPrey.width, controllerYPredator + 0 * controllerOffset);

    separationSliderPrey.position(controllerXPrey, controllerYPrey + 2 * controllerOffset);
    separationPreyLabel = createDiv('Separation Coefficient');
    separationPreyLabel.position(separationSliderPrey.x + separationSliderPrey.width + labelOffset,
        separationSliderPrey.y);

    alignmentSliderPrey.position(controllerXPrey, controllerYPrey + 3 * controllerOffset);
    alignmentPreyLabel = createDiv('Alignment Coefficient');
    alignmentPreyLabel.position(alignmentSliderPrey.x + alignmentSliderPrey.width + labelOffset,
        alignmentSliderPrey.y);

    cohesionSliderPrey.position(controllerXPrey, controllerYPrey + 4 * controllerOffset);
    cohesionSliderPreyLabel = createDiv('Cohesion Coefficient');
    cohesionSliderPreyLabel.position(cohesionSliderPrey.x + cohesionSliderPrey.width + labelOffset,
        cohesionSliderPrey.y);

    radiusSeparationSliderPrey.position(controllerXPrey, controllerYPrey + 5 * controllerOffset);
    radiusSeparationPreyLabel = createDiv('Radius of Separation');
    radiusSeparationPreyLabel.position(radiusSeparationSliderPrey.x + radiusSeparationSliderPrey.width
        + labelOffset, radiusSeparationSliderPrey.y);

    radiusAlignmentSliderPrey.position(controllerXPrey, controllerYPrey + 6 * controllerOffset);
    radiusAlignmentPreyLabel = createDiv('Radius of Alignment');
    radiusAlignmentPreyLabel.position(radiusAlignmentSliderPrey.x + radiusAlignmentSliderPrey.width
        + labelOffset, radiusAlignmentSliderPrey.y);

    radiusCohesionSliderPrey.position(controllerXPrey, controllerYPrey + 7 * controllerOffset);
    radiusCohesionPreyLabel = createDiv('Radius of Cohesion');
    radiusCohesionPreyLabel.position(radiusCohesionSliderPrey.x + radiusCohesionSliderPrey.width
        + labelOffset, radiusCohesionSliderPrey.y);

    colorSegregationOnOffButton = createCheckbox('Color Segregation', false);
    // colorSegregationOnOffButtonLabel = createDiv('Color Segregation');
    colorSegregationOnOffButton.position(controllerXNumber, controllerYNumber
        + 5 * controllerOffset);

    // Predator
    separationSliderPredator = createSlider(0, 2, 1, 0.05);
    radiusSeparationSliderPredator = createSlider(0, 60, 12, 0.01);
    radiusPreySliderPredator = createSlider(0, 60, 50, 0.01);

    separationSliderPredator.position(controllerXPredator, controllerYPredator
        + 2 * controllerOffset);
    radiusSeparationSliderPredator.position(controllerXPredator, controllerYPredator
        + 3 * controllerOffset);
    radiusPreySliderPredator.position(controllerXPredator, controllerYPredator
        + 4 * controllerOffset);

    separationPredatorLabel = createDiv('Separation Coefficient');
    separationPredatorLabel.position(separationSliderPredator.x + separationSliderPredator.width
        + labelOffset, separationSliderPredator.y);
    radiusSeparationPredatorLabel = createDiv('Radius of Separation');
    radiusSeparationPredatorLabel.position(radiusSeparationSliderPredator.x +
        radiusSeparationSliderPredator.width + labelOffset, radiusSeparationSliderPredator.y);
    radiusPreyPredatorLabel = createDiv('Radius of Vision');
    radiusPreyPredatorLabel.position(radiusPreySliderPredator.x +
        radiusPreySliderPredator.width + labelOffset, radiusPreySliderPredator.y);

    // Number Density
    numberOfPredatorsSlider = createSlider(0, 5, 0, 1);
    numberOfPredatorsSlider.position(controllerXPredator,
        controllerYPredator + 3 * controllerOffset);
    numberOfPredatorsLabel = createDiv('Number of Predators');
    numberOfPredatorsLabel.position(numberOfPredatorsSlider.x
        + numberOfPredatorsSlider.width + labelOffset,
        numberOfPredatorsSlider.y);

    numberOfPreysSlider = createSlider(0, 100, 25, 10);
    numberOfPreysSlider.position(controllerXNumber,
        controllerYNumber + 2 * controllerOffset)
    numberOfPreysLabel = createDiv('Number of Preys');
    numberOfPreysLabel.position(numberOfPreysSlider.x + labelOffset +
        numberOfPreysSlider.width, numberOfPreysSlider.y)

    numberLabel = createDiv('System characteristics');
    numberLabel.position((controllerXNumber + numberOfPredatorsSlider.width) / 2
        , controllerYNumber);
}
function centerCanvas() {
    var x = (windowWidth - canvasWidth) / 2;
    var y = (windowHeight - canvasHeight) / 2 + 10 * controllerYPrey;
    canvas.position(x, y);
}

function windowResized() {
    centerCanvas();
}

function setup() {
    canvasWidth = (2 * windowWidth) / 4;
    canvasHeight = (2.5 * windowHeight) / 4;
    canvas = createCanvas(canvasWidth, canvasHeight);
    createGUIElements();
    centerCanvas();

    flock = new Flock();
    predatorFlock = new Flock();
    totalBoids = numberOfPreysSlider.value();
    for (var i = 0; i < totalBoids; i++) {
        xOffSet = random(canvasWidth / 2);
        yOffSet = random(canvasHeight / 2);
        var boid = new Boid(canvasWidth / 2 - xOffSet, canvasHeight / 2 - yOffSet);
        flock.addBoid(boid);
    }
    totalPredators = numberOfPredatorsSlider.value();
    for (var i = 0; i < totalPredators; i++) {
        xOffSet = random(canvasWidth / 2);
        yOffSet = random(canvasHeight / 2);
        var boid = new Predator(canvasWidth / 2 - xOffSet, canvasHeight / 2 - yOffSet);
        predatorFlock.addBoid(boid);
    }

    greenColor = color(0, 255, 0);
    blueColor = color(0, 0, 255);
    colorsArray = [greenColor, blueColor];

    colorSegregationOnOffButton.changed(turnOnOffSegregation);
}

function turnOnOffSegregation() {
    if (isColorSegregationOn) {
        isColorSegregationOn = false;
    }
    else {
        isColorSegregationOn = true;
    }
    console.log("After pressing " + isColorSegregationOn);
}

function draw() {
    background(253, 233, 103);

    radiusSeparationSliderValuePrey = radiusSeparationSliderPrey.value();
    radiusAlignmentSliderValuePrey = radiusAlignmentSliderPrey.value();
    radiusCohesionSliderValuePrey = radiusCohesionSliderPrey.value();

    separationSliderValuePrey = separationSliderPrey.value();
    alignmentSliderValuePrey = alignmentSliderPrey.value();
    cohesionSliderValuePrey = cohesionSliderPrey.value();

    separationSliderValuePredator = separationSliderPredator.value();
    radiusSeparationSliderValuePredator = radiusSeparationSliderPredator.value();

    separationSliderValuePredator = separationSliderPredator.value();
    radiusSeparationSliderValuePredator = radiusSeparationSliderPredator.value();
    radiusPreySliderValuePredator = radiusPreySliderPredator.value();

    var currentBoids = numberOfPreysSlider.value();
    if(currentBoids != totalBoids) {
        if(currentBoids > totalBoids) {
            for(var i = 0; i < (currentBoids - totalBoids); i++) {
                xOffSet = random(canvasWidth / 2);
                yOffSet = random(canvasHeight / 2);
                var boid = new Boid(canvasWidth / 2 - xOffSet, canvasHeight / 2 - yOffSet);
                flock.addBoid(boid);
                totalBoids += 1;
            }
        }
        else if(currentBoids < totalBoids) {
            for(var i = 0; i < (totalBoids - currentBoids); i++) {
                flock.boids.pop();
                totalBoids -= 1;
            }
        }
    }
    flock.moveBoids();

    var currentPredators = numberOfPredatorsSlider.value();
    if(currentPredators != totalPredators) {
        if(currentPredators > totalPredators) {
            for(var i = 0; i < (currentPredators - totalPredators); i++) {
                xOffSet = random(canvasWidth / 2);
                yOffSet = random(canvasHeight / 2);
                var boid = new Predator(canvasWidth / 2 - xOffSet, canvasHeight / 2 - yOffSet);
                predatorFlock.addBoid(boid);
                totalPredators += 1;
            }
        }
        else if(currentPredators < totalPredators) {
            for(var i = 0; i < (totalPredators - currentPredators); i++) {
                predatorFlock.boids.pop();
                totalPredators -= 1;
            }
        }
    }
    predatorFlock.moveBoids();

}
