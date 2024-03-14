class Flower {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size / 7;
    this.numPetals = int(random(3, 18));
    this.angleBetweenPetals = 360 / this.numPetals;
    this.blobObj = [];
    this.colors = [
      { color: "#e4c1f9", probability: 0.1 },
      { color: "#a9def9", probability: 0.3 },
      { color: "#d0f4de", probability: 0.2 },
      { color: "#fcf6bd", probability: 0.1 },
      { color: "#ff99c8", probability: 0.3 },

      // Add more colors here...
    ];
  }
  drawFlower() {
    push();
    translate(this.x, this.y);
    scale(this.size);
    this.colorpallete();
    this.centcircle();
    this.drawPetalsAroundCircle();
    pop();
  }

  colorpallete() {
    let cumulativeProbability = 0;
    this.colors.forEach((colorObj) => {
      cumulativeProbability += colorObj.probability;
      colorObj.cumulativeProbability = cumulativeProbability;
    });

    let randCentcolor = random();
    let randPetalcolor = random();

    this.centcolor = this.colors.find(
      (colorObj) => randCentcolor <= colorObj.cumulativeProbability
    ).color;
    this.petalColor = this.colors.find(
      (colorObj) => randPetalcolor <= colorObj.cumulativeProbability
    ).color;
  }

  centcircle() {
    fill(this.centcolor);

    noStroke();

    beginShape(); // start to draw custom shape
    for (var i = 0; i < 36; i++) {
      var rad = random(1, 10);
      var randRad = rad + random(-10, 20);
      var angle = 360 / 24;
      //var distortion = sin(frameCount * 0.05 + i * 0.05) * 50; // Apply distortion here
      var x = randRad * cos(angle * i); // x-coordinate
      var y = randRad * sin(angle * i); //  y-coordinate
      this.blobObj.push({
        rad: randRad,
        x: x,
        y: y,
      });
      circle(this.blobObj[i].x, this.blobObj[i].y, 0);
      curveVertex(this.blobObj[i].x, this.blobObj[i].y); // add points to the custom shape
    }
    curveVertex(this.blobObj[0].x, this.blobObj[0].y);
    curveVertex(this.blobObj[1].x, this.blobObj[1].y);
    curveVertex(this.blobObj[2].x, this.blobObj[2].y);
    endShape(); // we finish adding points
  }

  drawPetalsAroundCircle() {
    //a loop to call drawPetal() and draw them randomly

    var numPetals = random(3, 12); // Number of petals
    var angleBetweenPetals = 360 / random(0, numPetals); // random angle for spacing

    for (var i = 0; i < numPetals; i++) {
      push(); // Save current drawing state
      rotate(angleBetweenPetals * i); // Rotate drawing context

      this.drawPetal(); // Draw a petal
      pop(); // Restore original drawing state
    }
  }
  drawPetal() {
    colorMode(HSB);
    //blendMode(MULTIPLY);

    fill(this.petalColor);

    push();
    translate(0, 0);
    //scale(random(0.1,0.3));
    scale(0.5);

    strokeWeight(3);
    noStroke();

    beginShape();

    // Adjust these values to add randomness while keeping a petal shape
    curveVertex(50 + random(-20, 20), 50 + random(-20, 20));
    curveVertex(50, 50);
    curveVertex(100, 60 + random(-10, 10));
    curveVertex(250 + random(-20, 20), 90 + random(-20, 20));
    curveVertex(300 + random(-30, 30), 250 + random(-30, 30));
    curveVertex(200 + random(-20, 20), 200 + random(-20, 20));
    curveVertex(100, 150 + random(-10, 10));
    curveVertex(50, 50);
    curveVertex(100, 60 + random(-10, 10));

    endShape();
    pop();
  }
}
