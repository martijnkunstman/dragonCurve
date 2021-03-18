let width = 4000;
let height = 4000;
let scale = 20;
let depth = 12;

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

function setup() {
  generateCurvePattern(depth);
  createCanvas(width, height);
  strokeWeight(10);
  rect(0, 0, width, height);
  let oldx = width / 2;
  let oldy = height / 2;
  let oldarcx = oldx;
  let oldarcy = oldy;
  let direction = 0;
  let arrayPoints = [];
  arrayPoints.push({ x: oldx, y: oldy });
  let color = 0;
  for (let i = 0; i < curvePattern.length; i++) {
    direction = curvePattern[i] ? direction + 1 : direction - 1;
    let x = Math.round(
      oldx + scale * Math.cos((Math.PI * direction * 90) / 180.0)
    );
    let y = Math.round(
      oldy + scale * Math.sin((Math.PI * direction * 90) / 180.0)
    );
    strokeWeight(0.5);
    //line(oldx, oldy, x, y);

    oldx = x;
    oldy = y;
    arrayPoints.push({ x: x, y: y });
    if (arrayPoints.length > 3) {
      arrayPoints.shift();
    }

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
      //-----
    }
  }
}

const download = document.getElementById('download');
download.addEventListener('click', function(e) {
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL()
  link.click();
  link.delete;
});