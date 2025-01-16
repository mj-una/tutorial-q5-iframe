////////////////////////////////////////////////////////////////////////
//
//
// OPTIMIZACION
// LOOPS SEGUN VISIBILIDAD
// 
// mucho texto
// explicacion objetivo codigo
// recomendacion aprender iframes y requestAnimationFrame
// link tutorial interactivo paso a paso
//
// link limpio: github.io
// 
//////////////////////////////////

/* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  **  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */
/* ~ */ /* ~ ~ ~ ~ Ajuste Modos De Reproduccion ~ ~ ~ ~ */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*         Modo Vista Parcial: (+) true         */ /* ~ */
/* ~ */ /*  se activa si al menos un borde es visible.  */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*        Modo Vista Estricta: (-) false        */ /* ~ */
/* ~ */ /* se activa solo si ambos bordes son visibles. */ /* ~ */
/* ~ */                                                    /* ~ */
/* ~ */       let VIS_PARCIAL = true; // EDITABLE!!!       /* ~ */
/* ~ */                                                    /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /* ~ ~ ~ ~ Usado Por "estaEnViewport()" ~ ~ ~ ~ */ /* ~ */
/* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  **  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */

// flag para evitar llamadas repetidas
let saltarLlamada = false;

//////////////////////////////////
// verificar si es visible
function estaEnViewport(elemento) {
  
  // posicion caja del elemento respecto a viewport
  const box = elemento.getBoundingClientRect();
  
  // visibilidad de los bordes (true/false si estan o no en el viewport)
  const bordeArriba = box.top >= 0 && box.top <= window.innerHeight;
  const bordeAbajo = box.bottom >= 0 && box.bottom <= window.innerHeight;

  // MODO VISTA PARCIAL: retorna true si al menos un borde es visible.
  // MODO VISTA ESTRICTA: retorna true solo si son visibles ambos bordes.
  if (VIS_PARCIAL) return bordeArriba || bordeAbajo; // (+) modo parcial
  else return bordeArriba && bordeAbajo; // (-) modo estricto
}

//////////////////////////////////
// revisa posicion y envía mensajes
function recorrerIframes() {

  // recorrer todos los elemento del dom con clase .sk-iframe
  document.querySelectorAll(".sk-iframe").forEach(elem => {
    // por cada uno:

    // [#2] revisa posicion
    const esVisible = estaEnViewport(elem);
    
    // [#3] ENVIO DE MENSAJE. apreder sobre iframes <3
    elem.contentWindow.postMessage({ activo: esVisible }, "*");
    // cada iframe tiene su propio contexto de ejecucion: contentWindow.
    // la api postMessage sirve para enviar informacion entre contextos,
    // en este caso: un objeto con propiedad "activo" de valor booleano.
    // el "*" significa que el mensaje puede ser recibido por cualquiera
    // (para mayor seguridad se podria limitar a un determinado dominio)
  });
}

//////////////////////////////////
// manejador eventos del viewport
function accesoLlamadas() {

  // validacion de acceso (salida temprana)
  if (saltarLlamada) return; // acceso bloqueado
  saltarLlamada = true; // bloquear acceso (temporal)
  
  // ejecutar en proximo render de la pantalla
  requestAnimationFrame(() => { // aprenderrrr
    recorrerIframes(); // <== [#1] LLAMADA CONTROLADA
    saltarLlamada = false; // liberar acceso nuevamente
  });
}

//////////////////////////////////
// [#0] EVENTOS INICIADORES DE EJECUCION

// primer acceso
window.addEventListener("load", accesoLlamadas);

// scroll y resize (los que afectan al viewport)
window.addEventListener("scroll", accesoLlamadas);
window.addEventListener("resize", accesoLlamadas);

//
//
// solo copiar hasta aca!!!
// fin de la plantilla de optimizacion de viewport.
// todo lo que sigue es para la explicacion de modo parcial vs estricto
////////////////////////////////////////////////////////////////////////

const titulModo = document.querySelector(".modo h2");
const textoModo = document.querySelector(".modo-txt");
const botonModo = document.querySelector("#btnModo");

// evento click boton
botonModo.addEventListener("click", () => {

  if (VIS_PARCIAL) {
    titulModo.innerHTML = "Modo vista estricta";
    textoModo.innerHTML = textoModoEstricto;
    botonModo.innerHTML = "Cambiar a<br>modo parcial";
    VIS_PARCIAL = false;
    accesoLlamadas();
    return;
  }
  
  titulModo.innerHTML = "Modo vista parcial";
  textoModo.innerHTML = textoModoParcial;
  botonModo.innerHTML = "Cambiar a<br>modo estricto"
  VIS_PARCIAL = true;
  accesoLlamadas();
});

// parrafos texto
const textoModoEstricto = `<p>Lorem ipsum consectetur adipisicing elit. Magni sunt vero commodi officia quam adipisci illo corporis ducimus, libero expedita quae, eaque nisi ea. Suscipit laborum esse a nisi facere.</p>
<p>Lorem, ipsum dolor sit consectetur de de de de adipisicing elit. Labore fugit in sequi iste est eos, veniam dolorum ipsum fuga ea hic totam itaque iusto tenetur ducimus? Eos rem ratione, cumque earum unde voluptatem aperiam esse modi maiores odit nemo rerum, temporibus fugiat sit quidem nulla eveniet quas eius aliquam asperiores quasi et ipsam saepe reiciendis? Adipisci iusto doloribus quis quam!</p>`;

const textoModoParcial = `<p>Lala consectetur adipisicing elit. Magni sunt vero commodi officia quam adipisci illo corporis ducimus, libero expedita quae, eaque nisi ea. Suscipit laborum esse a nisi facere.</p>
<p>Pepe upsum dolor sit amet consectetur adipisicing elit. Labore fugit in sequi iste est eos, veniam ipsum fuga ea hic totam itaque iusto tenetur ducimus? Eos rem ratione, cumque earum unde voluptatem aperiam es tese modi maiores odit nemo rerum, temporibus fugiat sit quidem nulla eveniet quas eius aliquam asperiores quasi et ipsam saepe reiciendis? Adipisci iusto doloribus quis quam!</p>`;

// iniciar texto
(() => {
  if (VIS_PARCIAL) textoModo.innerHTML = textoModoParcial;
  else textoModo.innerHTML = textoModoEstricto;
})() // funcion iife