const box = document.getElementById("box");
const popup = document.querySelector(".popup");
const picture = document.querySelector(".picture");

box.style.width = window.innerWidth;
box.style.height = window.innerHeight;

class point {
  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
  }
}

class massPoint {
  constructor(d) {
    this.X = 0.0;
    this.Y = 0.0;
    this.velocityX = 0.0;
    this.velocityY = 0.0;
    this.forceX = 0.0;
    this.forceY = 0.0;
    this.mass = 0.01;
    this.frct = 0.05;
    this.deltaT = d;
  }
  calculateForce(extForceX, extForceY) {
    this.forceX = extForceX - this.frct * this.velocityX;
    this.forceY = extForceY - this.frct * this.velocityY;
  }
  calculateVelocity() {
    this.velocityX = this.velocityX + (this.forceX / this.mass) * this.deltaT;
    this.velocityY = this.velocityY + (this.forceY / this.mass) * this.deltaT;
  }
  calculatePosition() {
    this.X = this.X + this.velocityX * this.deltaT;
    this.Y = this.Y + this.velocityY * this.deltaT;
    if (this.X > window.innerWidth) this.X = this.X - window.innerWidth;
    if (this.X < 0) this.X = this.X + window.innerWidth;
    if (this.Y > window.innerHeight) this.Y = this.Y - window.innerHeight;
    if (this.Y < 0) this.Y = this.Y + window.innerHeight;
  }
}

var elct = 20.0; //electrostatic force
var intervalTime = 20; // interval time  (ms)
var N = 200;
var size = 1000.0;

var ball = new Array(N);
var circlesHTML = "";
const colors = [
  "#1c0800",
  "#988c8d",
  "#e6e1dc",
  "#695c61",
  "#928d88",
  "#271b14",
];

for (var i = 0; i < N; i++) {
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;

  ball[i] = new massPoint(intervalTime * 0.001);
  ball[i].X = x;
  ball[i].Y = y;
  ball[i].velocityX = 0;
  ball[i].velocityY = 0;
  const color = colors[Math.round(Math.random() * (colors.length - 1))];

  circlesHTML =
    circlesHTML +
    '<circle   cx="' +
    x +
    '" cy="' +
    y +
    '" r="10" stroke-width ="20" stroke="' +
    color +
    '" stroke-opacity="0.5" fill="' +
    color +
    '" fill-opacity="1" id="circle' +
    (i + 1) +
    '"/>';
}

document.getElementById("circles").innerHTML = circlesHTML;

var t = 0;
setInterval(function () {
  t = t + 1;
  var f = Math.sin((t * intervalTime * 0.001 * 2 * Math.PI) / 5);
  for (var i = 0; i < N; i++) {
    ball[i].frct = 0.05 + 0.05 * f;

    var randomX = Math.random() - 0.5;
    var randomY = Math.random() - 0.5;
    var AR = 100;
    ball[i].velocityX += AR * randomX;
    ball[i].velocityY += AR * randomY;

    ball[i].calculateForce(0, 0); //

    ball[i].calculateVelocity();
    ball[i].calculatePosition();

    document.getElementById("circle" + (i + 1)).style.cx = Math.round(
      ball[i].X
    );
    document.getElementById("circle" + (i + 1)).style.cy = Math.round(
      ball[i].Y
    );
  }
}, intervalTime);

const click = (e) => {
  if (e.target.closest(".icon")) {
    return;
  }
  if (popup.classList.contains("popup_active")) {
    popup.classList.remove("popup_active");
    picture.classList.remove("picture_active");
  } else {
    popup.classList.add("popup_active");
    picture.classList.add("picture_active");
  }
};

document.addEventListener("click", click);
