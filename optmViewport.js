////////////////////////////////////////////////////////////////////////
//
//
// PLANTILLA: OPTIMIZACION VIEWPORT
// sirve para activar loops segun visibilidad
//  
// version sin comentarios (menos spam, pero se pierde la poesia):
// https://github.com/mj-una/tutorial-p5-iframes/blob/limpio/optmViewport.js
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
/* ~ */ /*    Para usar plantilla: edita true/false     */ /* ~ */
/* ~ */ /*   y borra los ultimos bloques del archivo!   */ /* ~ */
/* ~ */ /*               (estan marcados)               */ /* ~ */
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
// fin de la plantilla
//
//     > > @ < <
//
// solo copiar hasta aca!!!
// todo lo que sigue es para la explicacion de modo parcial vs estricto
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// ANTES DE USAR PLANTILLA --> BORRA TODO ESTOOOooOOoooOOOooOOoOOOOoOoOO
// (sirve para interactividad del boton)

// BORRAR 1/5: capturar dom
const titulModo = document.querySelector(".modo h2");
const textoModo = document.querySelector(".modo-txt");
const botonModo = document.querySelector("#btnModo");

// BORRAR 2/5: evento click boton
botonModo.addEventListener("click", () => {

  if (VIS_PARCIAL) {
    titulModo.innerHTML = "Modo vista estricta:";
    textoModo.innerHTML = textoModoEstricto;
    botonModo.innerHTML = "Cambiar a<br>modo parcial";
    VIS_PARCIAL = false;
    accesoLlamadas();
    return;
  }
  
  titulModo.innerHTML = "Modo vista parcial:";
  textoModo.innerHTML = textoModoParcial;
  botonModo.innerHTML = "Cambiar a<br>modo estricto"
  VIS_PARCIAL = true;
  accesoLlamadas();
});

// BORRAR 3/5: parrafos texto
const textoModoEstricto = `<p>Fijate ahora, los sketchs se activan recien cuando estan por completo dentro de la zona visible (el viewport) de la pantalla.</p>
<p>Esto no solo es una optimizacion de recursos, sino que ademas fuerza a las personas a detenerse frente a cada contenido en especifico. Estas focalizaciones, mas al snap scroll, son la base del diseño ux de tiktok o los reels de instagram.</p>`;

const textoModoParcial = `<p>No se nota, pero los sketchs se pausan cada vez que salen de la pantalla. Asi se ahorran muchiiismos recursos, porque el loop de p5 es pesado y puede colapsar la pagina si varios dibujos se ejecutan al mismo tiempo.</p>
<p>Y agrego otra opcion (muy tipica en ux de scroll infinito) para que los sketchs se ejecuten recien cuando sean totalmente visibles. <br>Probala aqui:</p>`;

// BORRAR 4/5: iniciar texto
(() => {
  if (VIS_PARCIAL) textoModo.innerHTML = textoModoParcial;
  else textoModo.innerHTML = textoModoEstricto;
})() // funcion iife

//////////////////////////////////
// BORRAR 5/5: recordatorio

// acordate de borrar los ultimos 5 bloques de codigo
// con ctrl+f busca la arroba: > > @ < <
