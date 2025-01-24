
const TX = 5; // DEEP = 47
const DEEP = Math.round(Math.pow(1.732, TX + 2));
const SHAD = [188 / DEEP, 235 / DEEP, 282 / DEEP];

let slowing, delta;
let pressIn, pressOut;

let mantiene = false;

//////////////////////////////////
function setup() {

  createCanvas(540, 960); // <- proportion!
  
  frameRate(30);
  noLoop(); // untill focused

  displayMode("maxed"); // q5 responsive <3
  noiseMode("perlin"); // q5 original noise
  strokeWeight(2);
  
  slowing = 1;
	delta = 0.01;
	pressIn = true;
	pressOut = false;
  
  // message event
  window.addEventListener("message", (e) => {
    if (
      !e.data ||
      typeof e.data.focused !== "boolean"
    ) return;

    if (typeof e.data.pointer5 === "boolean") {
      mantiene = e.data.pointer5;
    }

    // play / pausa
    if (e.data.focused) loop();
    else noLoop();
  });
}

//////////////////////////////////
function draw() {
  
  // general rhythm
  let g_r = sin(frameCount * 0.08);
  let g_fr = map(g_r, -1, 1, 0.6, 1);

  // slow down / normalize
  if (mantiene) {
    if (pressIn) {
      pressIn = false;
      pressOut = true;
      slowing = 1;
    }
    if (abs(g_r) > delta) g_r /= slowing;
    if (abs(g_fr) > delta) g_fr /= slowing;
    if (slowing < 2.4) slowing += 0.04;
    console.log(slowing)
  }
  else {
    if (pressOut) {
      pressOut = false;
      pressIn = true;
    }
    if (slowing > 1) {
      slowing -= 0.06;
      if (slowing < 1) slowing = 1; 
      g_r /= slowing;
      g_fr /= slowing;
    }
  }

  // drawing
  background(9, 5, 6);
	translate(270, 480); 
  
  // TEST DEEPNESS
  for (let i = DEEP; i > 0; i--) {

    // local rhythm
    let r = g_r;
    let fr = g_fr;
    
    // local update
    if (slowing > 1) {
      r /= slowing;
      fr /= slowing;
    }

    // noise second parameter
    const ns = frameCount * 0.017 + i * 0.051 * fr;

    // noise generation
    const nx = noise(frameCount * 0.031 + i * 0.079 * fr, ns) - 0.5;
    const ny = noise(frameCount * 0.069 + i * 0.067 * fr, ns) - 0.5;
		
    // position
		const x = nx * 390 * fr;
		const y = ny * 520 * fr;

		// circles
		push();
    stroke(9, 5, 6, 4 * (50 - i));
    fill(
      constrain(map(r, -1, 1, 120, 295) - i * SHAD[0], 9, 255),
      constrain(map(r, -1, 1, 170, 190) - i * SHAD[1], 5, 255),
      constrain(255 - i * SHAD[2], 6, 265)
    );
    circle(x, y, (i + 0.5) * 22);
		pop();
  }
}
