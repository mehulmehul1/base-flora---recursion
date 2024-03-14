let minBranchLength = 30;
let maxBranchLength = 120;
let allNodes = [];
let edges = [];
let counter = 0;
let flowers = [];

function makeNode(parentNode, position, radius, depth) {
  this.parentNode = parentNode;
  this.childrenNodes = [];

  this.position = position;
  this.radius = radius;

  this.depth = depth;
  this.id = counter++;
  this.flower = new Flower(this.position.x, this.position.y, this.radius / 10);
  this.flowerDrawn = false;

  this.attemptGrowth = function () {
    if (this.depth > 0) {
      let angleFromParent = random(TAU);
      let distFromParent = random(minBranchLength, maxBranchLength);
      let childSize = max(this.radius * 0.85, 2);

      let childPosition = {
        x: this.position.x + distFromParent * cos(angleFromParent),
        y: this.position.y + distFromParent * sin(angleFromParent),
      };
      let child = new makeNode(this, childPosition, childSize, this.depth - 1);

      let edge = {
        p1: { x: childPosition.x, y: childPosition.y },
        p2: { x: this.position.x, y: this.position.y },
      };
      let placeable = true;

      for (let n = 0; n < allNodes.length; n++) {
        if (child.intersects(allNodes[n]) || this.boundaryCheck()) {
          placeable = false;
          return false;
        }
      }

      for (let n = 0; n < edges.length; n++) {
        if (nodeEdgeCollision(child, edges[n]) < child.radius / 2 + 20) {
          console.log(nodeEdgeCollision(child, edges[n]));
          placeable = false;
          return false;
        }

        if (edgeIntersect(edge, edges[n])) {
          placeable = false;
          return false;
        }
      }

      if (placeable) {
        allNodes.push(child);
        this.childrenNodes.push(child);
        edges.push(edge);
        return true;
      }
    }
  };

  this.grow = function () {
    let hasGrown = this.attemptGrowth();
    if (!hasGrown) {
      let randChild = random(this.childrenNodes);

      if (randChild) {
        randChild.grow();
      }
    }
  };

  this.intersects = function (otherNode) {
    let inter = false;
    if (
      this.id != otherNode.id &&
      dist(
        this.position.x,
        this.position.y,
        otherNode.position.x,
        otherNode.position.y
      ) <
        this.radius / 2 + otherNode.radius / 2 + 10
    ) {
      inter = true;
    }
    return inter;
  };

  this.boundaryCheck = function () {
    if (
      this.position.x - this.radius < PAD ||
      this.position.x + this.radius > width - PAD ||
      this.position.y - this.radius < PAD ||
      this.position.y + this.radius > height - PAD
    ) {
      return true;
    }
    return false;
  };

  /* this.display = function(){
    
    if (this.flowerDrawn) {
      return;
    }
    if(parentNode != null){
      line(this.position.x, this.position.y, this.parentNode.position.x, this.parentNode.position.y)
      //ellipse(this.parentNode.position.x , this.parentNode.position.y, this.parentNode.radius)
      this.flower.drawFlower();
      //this.flowerDrawn = true; 
      
    }
    this.flower.drawFlower();
    //this.flowerDrawn = true; 
    
    //ellipse(this.position.x, this.position.y, this.radius);
   
  }
  */
  this.display = function () {
    // If the flower is already drawn, skip drawing
    if (this.flowerDrawn) {
      return;
    }

    // Draw a line to the parent node if it exists
    if (parentNode != null) {
      line(
        this.position.x,
        this.position.y,
        this.parentNode.position.x,
        this.parentNode.position.y
      );
    }

    // Draw the flower
    this.flower.drawFlower();

    // Set the flag to true to indicate the flower has been drawn
    this.flowerDrawn = true;
  };
}

function dist2(v, w) {
  return sq(v.x - w.x) + sq(v.y - w.y);
}
function distToSegmentSquared(node, edge) {
  p = node.position;
  v = edge.p1;
  w = edge.p2;

  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
}
function nodeEdgeCollision(p, v, w) {
  return sqrt(distToSegmentSquared(p, v, w));
}

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function edgeIntersect(edge1, edge2) {
  let [a, b] = [edge1.p1.x, edge1.p1.y];
  let [c, d] = [edge1.p2.x, edge1.p2.y];
  let [p, q] = [edge2.p1.x, edge2.p1.y];
  let [r, s] = [edge2.p2.x, edge2.p2.y];

  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
}
