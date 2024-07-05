let data = [];
let m = 0;
let b = 0;

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);
  let point = createVector(x, y);
  data.push(point);
}

function drawLine() {
  let x1 = 0;
  let y1 = m * x1 + b;
  let x2 = 1;
  let y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);

  stroke(255);
  strokeWeight(2);
  line(x1, y1, x2, y2);
}

function linearRegression() {
  let xsum = 0;
  let ysum = 0;
  for (let i = 0; i < data.length; i++) {
    xsum += data[i].x;
    ysum += data[i].y;
  }
  let xmean = xsum / data.length;
  let ymean = ysum / data.length;

  let num = 0;
  let den = 0;
  for (let i = 0; i < data.length; i++) {
    let x = data[i].x;
    let y = data[i].y;
    num += (x - xmean) * (y - ymean);
    den += (x - xmean) * (x - xmean);
  }

  m = num / den;
  b = ymean - m * xmean;
}

function draw() {
  background(51);
  for (let i = 0; i < data.length; i++) {
    let x = map(data[i].x, 0, 1, 0, width);
    let y = map(data[i].y, 0, 1, height, 0);
    let yline = m * data[i].x + b;
    let ylinePixel = map(yline, 0, 1, height, 0);
    let d = dist(x, y, x, ylinePixel);
    if (d < 50) {
      fill(0, 255, 0); 
    } else {
      let redValue = map(d, 50, width / 2, 100, 255); 
      fill(redValue, 0, 0); 
    }
    stroke(255);
    ellipse(x, y, 8, 8);
  }
  if (data.length > 1) {
    linearRegression();
    drawLine();
  }
}
