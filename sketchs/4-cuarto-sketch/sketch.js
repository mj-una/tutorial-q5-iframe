
////////////////////////////////////////////////////////////////////
//
// PLANTILLA DE SKETCH
// para incluir dentro de un iframe.
//
// copia y pega el html sin agregar nada,
// solo cambia los links de javascript en caso que sea necesario.
// (por ejemplo si tenes varios archivos .js o si usas p5.sound)
//
// todos los estilos css ya estan incluidos, no los toques a menos
// que entiendas bien lo que estas haciendo (es un iframe)
//
// segui las intrucciones marcadas con "[ $$ ]" buscalas con ctrl+f.
// esta plantilla es una base, si aprendes a usar la api postMessage
// podes hacer muchiiismas otras cosas. recomendadisimo 100000% 
//
// la funcion "comunicarSketch" sirve para:
// 1) adaptar el canvas a la medida del contexto (el iframe).
// 2) recibir un mensaje booleano para activar o desctivar el loop.
// hay que copiarla completa. y no olvides la llamada inical! [ $$ ]
//
//////////////////////////////////

  /* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  **  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */
  /* ~ */ /* ~ ~ ~ ~ Cualquier Cosa En El Inicio! ~ ~ ~ ~ */ /* ~ */
  /* ~ */                                                    /* ~ */
  /* ~ */    // VARIABLES GLOBALES, PRELOAD, ETC, ETC. //    /* ~ */
  /* ~ */                                                    /* ~ */
  /* ~ */ /* ~ ~ Borra Este Bloque Y Coloca Tu Codigo ~ ~ */ /* ~ */ 
  /* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ >[ $$ ]< ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */

//////////////////////////////////
function setup() {

  // resolucion interna. no tamaño final, eso se maneja
  // desde el css de la pagina principal (fuera de este iframe)
  createCanvas(500, 600); // EDITABLE!! OJO A LA PROPORCION!! [ $$ ]
  comunicarVentana(); // <= se llama una vez creado el canvas [ $$ ]

  /* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  **  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */
  /* ~ */ /* ~ ~ ~ ~ Cualquier Cosa En El Setup!! ~ ~ ~ ~ */ /* ~ */
  /* ~ */                                                    /* ~ */
  /* ~ */   // INICIALIZACIONES, AJUSTES GENERALES, ETC //   /* ~ */
  /* ~ */                                                    /* ~ */
  /* ~ */ /* ~ ~ Borra Este Bloque Y Coloca Tu Codigo ~ ~ */ /* ~ */
  /* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ >[ $$ ]< ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */
}

//////////////////////////////////
function draw() {

  /* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  **  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */
  /* ~ */ /* ~ ~ ~ ~ Cualquier Cosa En EL Draw!!! ~ ~ ~ ~ */ /* ~ */
  /* ~ */ /* ~ ~ ~ ~ ~ ~ Dibujitos De Ejemplo ~ ~ ~ ~ ~ ~ */ /* ~ */
  /* ~ */                                                    /* ~ */
  /* ~ */  const vl = 0.002;                                 /* ~ */
  /* ~ */  const re = (frameCount * 3) % 255;                /* ~ */
  /* ~ */  if (re === 0) return;                             /* ~ */
  /* ~ */  const ci = ceil((frameCount * 3) / 255) * 1234;   /* ~ */
  /* ~ */  const px = noise(re * vl + ci) * 500;             /* ~ */
  /* ~ */  const py = noise(re * vl + ci + 1234) * 600;      /* ~ */
  /* ~ */  background(250, 100 + (re * 0.1), re);            /* ~ */
  /* ~ */  fill(250, 24);                                    /* ~ */
  /* ~ */  for (let i = 0; i < 10; i++) {                    /* ~ */
  /* ~ */   circle(px, py, 150 + i * 100);                   /* ~ */
  /* ~ */  }                                                 /* ~ */
  /* ~ */  const txt = isLooping().toString().toUpperCase()  /* ~ */
  /* ~ */  fill(0);                                          /* ~ */
  /* ~ */  textSize(44);                                     /* ~ */
  /* ~ */  textAlign(CENTER, CENTER);                        /* ~ */
  /* ~ */  text(txt, px, py);                                /* ~ */
  /* ~ */                                                    /* ~ */
  /* ~ */ /* ~ ~ Borra Este Bloque Y Coloca Tu Codigo ~ ~ */ /* ~ */
  /* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ >[ $$ ]< ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */
}

//////////////////////////////////
// COPIA Y PEGA: TODA ESTA FUNCIONnnNNnN [ $$ ]
// y llamala justo despues de createCanvas!!!
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
  displayMode("maxed"); // responsive nativo de q5
  noLoop(); // inicia pausado hasta que llegue mensaje
} // fin de "comunicarVentana()". copiar hasta aca [ $$ ]

// fin de la plantilla. saludos. 
////////////////////////////////////////////////////////////////////
