////////////////////////////////////////////////////////////////////////
//
//
// OPTIMIZACION: 
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

// variable global (de estado):
// flag para evitar llamadas repetidas
let saltarLlamada = false;

//////////////////////////////////
// verificar si es visible
function estaEnViewport(elemento, parcial = true) {
  
  // posicion caja del elemento respecto a viewport
  const box = elemento.getBoundingClientRect();
  
  // visibilidad de los bordes (true/false si estan o no en el viewport)
  const bordeArriba = box.top >= 0 && box.top <= window.innerHeight;
  const bordeAbajo = box.bottom >= 0 && box.bottom <= window.innerHeight;

  // por defecto = se activa cuando el iframe es PARCIALMENTE visible.
  // depende de 2do arg = para que se active cuando sea TOTALMENTE visible:
  // cambiando "||" por "&&" (asi retorna true solo si se ven ambos bordes)
  if (parcial) return bordeArriba || bordeAbajo;
  else return bordeArriba && bordeAbajo;
}

//////////////////////////////////
// revisa posicion y envía mensajes
function recorrerIframes() {

  // recorrer todos los elemento del dom con clase .sk-iframe
  document.querySelectorAll(".sk-iframe").forEach(elem => {
    // por cada uno:

    // [#2] revisa posicion
    // dewfdewfdw ee wd ew dew de  ed dwe dwe dew ew de w
    const MODO_PARCIAL = false; // EDITABLE!!! true / false
    const esVisible = estaEnViewport(elem, MODO_PARCIAL);
    
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
//
////////////////////////////////////////////////////////////////////////

// [#0] EVENTOS INICIADORES DE EJECUCION

// primer acceso
window.addEventListener("load", accesoLlamadas);

// scroll y resize (los que afectan al viewport)
window.addEventListener("scroll", accesoLlamadas);
window.addEventListener("resize", accesoLlamadas);

