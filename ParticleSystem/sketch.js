class Particle {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.velocity = createVector(random(-1, 1), random(-2, 0), random(-1, 1));
    this.acceleration = createVector(0, 0.05, 0);
    this.lifespan = 255; // 입자 수명
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
  constructor(x, y, z) {
    this.origin = createVector(x, y, z);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y, this.origin.z));
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
  createCanvas(400, 400, WEBGL);
  system = new ParticleSystem(0, 0, 0);
  background(255);
}

function draw() {
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  system.addParticle();
  system.run();
}
