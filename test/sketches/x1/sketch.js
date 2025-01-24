const TX = 1;
const DEEP = Math.ceil(Math.pow(1.732, TX + 2)); // 47
const SHAD = [188 / DEEP, 235 / DEEP, 282 / DEEP];

let slowing, delta;
let pressed, ended;

//////////////////////////////////
function setup() {

  createCanvas(540, 960); // <== OJO A LA PROPORCION!!
  comunicarVentana(); // <= se llama una vez creado el canvas
  
  textSize(20);
	textAlign(CENTER, CENTER);
	angleMode(DEGREES);
	rectMode(CENTER);
	strokeWeight(2);
  frameRate(30);

  slowing = 1;
	delta = 0.01;
	pressed = true;
	ended = false;
}

//////////////////////////////////
function draw() {
  
  // general rhythm
  let g_r = sin(frameCount * 8);
  let g_fr = map(g_r, -1, 1, 0.6, 1);

  // slow down / normalize
  if (mouseIsPressed) {
    if (pressed) {
      pressed = false;
      ended = true;
      slowing = 1;
    }
    if (abs(g_r) > delta) g_r /= slowing;
    if (abs(g_fr) > delta) g_fr /= slowing;
    if (slowing < 3) slowing += 0.0005;
  }
  else {
    if (ended) {
      ended = false;
      pressed = true;
    }
    if (slowing > 1) {
      slowing -= 0.0008;
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

		// position
		let x = (noise(frameCount * 0.031 + i * 0.079 * fr) - 0.5) * 390 * fr;
		let y = (noise(frameCount * 0.069 + i * 0.067 * fr) - 0.5) * 520 * fr;

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

//////////////////////////////////
function comunicarVentana() {

  // manejador evento message
  function actualizarReproduccion(e) {

    // validacion de tipo
    if (!e.data || typeof e.data.activo !== "boolean") return;

    // play/pausa
    if (e.data.activo) loop();
    else noLoop();
  }

  // evento message (info desde contexto externo)
  window.addEventListener("message", actualizarReproduccion);

  // primera ejecucion
  displayMode("maxed"); // q5 responsive
  noLoop(); // inicia pausado hasta que llegue mensaje
}