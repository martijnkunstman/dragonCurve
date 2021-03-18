let width = 5000;
let height = 5000;
let scale = 20;
let depth = 11;
let xstart = width / 2+650;
let ystart = height / 2-650;
//----------------

let curvePattern = [0];

function generateCurvePattern(itterations) {
  for (let i = 0; i < itterations; i++) {
    curvePattern = curvePattern.concat(
      curvePattern.map((x) => (x ? 0 : 1)).reverse()
    );
    curvePattern.splice(Math.floor(curvePattern.length / 2), 0, 0);
  }
}

strokeW = 0.5;

function setup() {
  generateCurvePattern(depth);
  createCanvas(width, height);
  strokeWeight(10);
  rect(0, 0, width, height);
  let x = xstart;
  let y = ystart;
  let oldx = xstart;
  let oldy = ystart;
  let direction = 0;
  let arrayPoints = [];
  arrayPoints.push({ x: oldx, y: oldy });
  let color = 0;
  //strokeWeight(10);
  //point(oldx, oldy);

  xmin=10000;
  xmax=-10000;
  ymin=10000;
  ymax=-10000;

  stroke(0,0,255);

  for (a = 0; a < 4; a++) {


    for (let i = 0; i < curvePattern.length; i++) {
      direction = curvePattern[i] ? direction + 1 : direction - 1;
      x = Math.round(
        oldx + scale * Math.cos((Math.PI * direction * 90) / 180.0)
      );
      y = Math.round(
        oldy + scale * Math.sin((Math.PI * direction * 90) / 180.0)
      );

      if (xmin>x)
      {
        xmin = x;
      }
      if (ymin>y)
      {
        ymin = y;
      }
      if (xmax<x)
      {
        xmax = x;
      }
      if (ymax<y)
      {
        ymax = y;
      }


      oldx = x;
      oldy = y;
      arrayPoints.push({ x: x, y: y });
      if (arrayPoints.length > 3) {
        arrayPoints.shift();
      }

      if (i > curvePattern.length / 2) {
        strokeW = strokeW + 0.00015;
      }
      else {
        strokeW = strokeW + 0.00015;
      }

      strokeWeight(strokeW);

      strokeWeight(2);

      if (arrayPoints.length == 3) {
        xx = (arrayPoints[0].x + arrayPoints[2].x) / 2;
        yy = (arrayPoints[0].y + arrayPoints[2].y) / 2;
        //-----
        if (
          arrayPoints[0].x > arrayPoints[2].x &&
          arrayPoints[0].y < arrayPoints[2].y
        ) {
          if (yy > arrayPoints[1].y) {
            arc(xx, yy, scale, scale, PI, PI + PI / 2);
          } else {
            arc(xx, yy, scale, scale, 0, PI / 2);
          }
        }
        //-----
        if (
          arrayPoints[0].x < arrayPoints[2].x &&
          arrayPoints[0].y < arrayPoints[2].y
        ) {
          if (yy > arrayPoints[1].y) {
            arc(xx, yy, scale, scale, PI + PI / 2, 0);
          } else {
            arc(xx, yy, scale, scale, PI / 2, PI);
          }
        }
        //-----
        if (
          arrayPoints[0].x > arrayPoints[2].x &&
          arrayPoints[0].y > arrayPoints[2].y
        ) {
          if (yy > arrayPoints[1].y) {
            arc(xx, yy, scale, scale, PI + PI / 2, 0);
          } else {
            arc(xx, yy, scale, scale, PI / 2, PI);
          }
        }
        //-----
        if (
          arrayPoints[0].x < arrayPoints[2].x &&
          arrayPoints[0].y > arrayPoints[2].y
        ) {
          if (yy > arrayPoints[1].y) {
            arc(xx, yy, scale, scale, PI, PI + PI / 2);
          } else {
            arc(xx, yy, scale, scale, 0, PI / 2);
          }
        }
      }
    }
  }
  //strokeWeight(10);
  //point(x, y);
  originx = (xmin+xmax)/2;
  originy = (ymin+ymax)/2;

  //three
  strokeWeight(2);
  stroke(255,0,0);
  threeLengthStart = 800;
  drawLine(originx, originy, threeLengthStart, -90);
  drawLine(originx, originy, threeLengthStart, 0);
  drawLine(originx, originy, threeLengthStart, 90);
  drawLine(originx, originy, threeLengthStart, 180)

  console.log((width/2-xmin)+"-"+(width/2-xmax));
  console.log((height/2-ymin)+"-"+(height/2-ymax));

}



function drawLine(x, y, length, direction) {
  if (length > 10) {
    oldx = x;
    oldy = y;
    x = x + length * Math.cos((Math.PI * direction) / 180.0);
    y = y + length * Math.sin((Math.PI * direction) / 180.0);

    line(oldx,oldy,x,y);

    drawLine(x, y, length / 1.4142135623, direction - 45);
    drawLine(x, y, length / 1.4142135623, direction + 45);
  }
}







const download = document.getElementById('download');
download.addEventListener('click', function (e) {
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL()
  link.click();
  link.delete;
});