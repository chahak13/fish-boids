# Fish Swarm Dynamics

## Abstract
This project aims at understanding the phenomenon of swarming in organisms like fishes which tend to show collective behaviour. It tries to model and understand different rules that govern the local behaviour of the organisms which in turn lead to a collective behaviour on the whole.

## The Extended Craig Reynolds' Model
The project is based on the Craig Reynolds' model for simulating the fish swarms and extends the model further.

The Prey fishes (boids) follows the simple five rules stated below.
1. Avoid collision with other prey fishes
2. Align the velocity
3. Move towards the center of the neighboring fishes
4. Move toward the center of the neighboring fishes of the same species(color)
5. Avoid predator

The Predator boids follow the simple two rules stated below.
1. Avoid collision with other predator fishes
2. Move towards the center of neighboring prey fishes, i.e., locking of the prey fishes

## The code structure
There are 4 different JavaScript files in the `js` subdirectory.

The `flock.js` file contains the implementation of the `Flock` class which maintains the list of prey or predator boid objects.

The `boid.js` file contains the implementation of the Prey boid under the `Boid` class. This class is responsible for implementing all the rules for prey boid and also for rendering a Prey boid.

The `predator.js` file contains the implementation of the Predator boid under the `Predator` class. This class is responsible for implementing all the rules for predator boid as discussed above and also for rendering a Predator boid.

The `runner.js` file is the most important file. It is responsible for creating the GUI elements such as sliders, check box and the canvas. Using the `p5.js` library, it handles the updates of the parameters and GUI.

## Using the project
There are two ways to start the project and analyze the model

One can either open the project online from [here](https://chahak13.github.io/fish-boids/) or can open the `index2.html` file present in the current directory to open it locally. Nothing except a browser is needed if one wants to run the project locally.

###### (The project is hosted at [https://chahak13.github.io/fish-boids/](https://chahak13.github.io/fish-boids/))
