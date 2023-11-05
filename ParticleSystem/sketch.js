class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector(0, 0.05);
    this.lifespan = 255; 
    this.color = color(random(255), random(255), random(255));
    this.size = random(5, 20);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  display() {
    noStroke();
    fill(this.color, this.lifespan);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

class ParticleSystem {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update();
      particle.display();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

let system;

function setup() {
  createCanvas(400, 400);
  system = new ParticleSystem(width / 2, height);
  background(255);
}

function draw() {
  system.addParticle();
  system.run();
}
