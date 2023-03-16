let variant

let xoff = 0

let canvas
let w = window.innerWidth
let h = window.innerHeight

function setup() {
  canvas = createCanvas(w, h)
  angleMode(DEGREES)
  colorMode(HSB, 100)
  variant = random(variants)
}

function centerView() {
  translate(width / 2, height / 2)
}

function calculateCoordinates(r, k, scaler = null) {
  if (scaler) {
    return { x: r * cos(k) * scaler, y: r * sin(k) * scaler }
  }
  return { x: r * cos(k), y: r * sin(k) }
}

function createVertex(i, n, d, scaler) {
  let k = i * d
  let r = sin(n * k)
  let coord = calculateCoordinates(r, k, scaler)
  curveVertex(coord.x, coord.y)
}

function getNoiseColor(xoff) {
  return map(noise(xoff), 0, 1, 0, 100)
}

function draw() {
  background(10)

  stroke(20)
  fill(20)
  textFont("Courier")
  textSize(12)
  text(
    `Maurer rose: d = ${variant.d.toFixed(0)}, n = ${variant.n.toFixed(0)}`,
    width - 198,
    height - 10
  )

  centerView()
  stroke(getNoiseColor(xoff), 80, 100)
  noFill()
  beginShape()
  for (let i = 0; i < 361; i++) {
    createVertex(i, variant.n, variant.d, width / 4)
    smooth()
  }
  endShape()

  variant.n += 0.000001
  variant.d += 0.00001
  xoff += 0.001
}

window.onresize = function () {
  w = window.innerWidth
  h = window.innerHeight
  canvas.size(w, h)
}
