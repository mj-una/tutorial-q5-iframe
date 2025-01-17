////////////////////////////////////////////////////////////////////////
//
//
// PLANTILLA: OPTIMIZACION CACHE (version con async/await)
// sirve para decargar libreria p5 en memoria local
//
// version sin comentarios (menos spam, pero se pierde el chisme):
// https://github.com/mj-una/tutorial-p5-iframes/blob/limpio/optmCacheAsAw.js 
//
//////////////////////////////////

/* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  **  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */
/* ~ */ /* ~ ~ ~ ~ ~ ~ ~ Ajuste De La Url ~ ~ ~ ~ ~ ~ ~ */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*     Copia y pega el link de p5, que esta     */ /* ~ */
/* ~ */ /*  en la etiqueta <script> del head tus html.  */ /* ~ */
/* ~ */                                                    /* ~ */
const URL_P5 = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.min.js";
/* ~ */                                                    /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*     P.D: estoy preparando otro codigo        */ /* ~ */
/* ~ */ /*    con un worker multitasking precarizado    */ /* ~ */
/* ~ */ /*   que maneje varios links al mismo tiempo,   */ /* ~ */
/* ~ */ /*     pero voy paso a paso, pq asincronia.     */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /* ~ El Event Loop De JS Es Una Obra De Harte ~ */ /* ~ */
/* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  **  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */

//////////////////////////////////
// manejador evento install
async function escribirCache(evento) {
  
  // waitUntil asegura que todas las tareas se terminen de ejecutar
  // antes de que termine el evento install. en este caso descargar p5
  evento.waitUntil( // *recibe una promesa (aprender "asincronia") !!!
    (async () => { // *invocacion inmediata (aprender "funciones iife")

      // el objeto "caches" es parte de la api "cache storage"
      // y permite escribir/leer recursos en memoria local del navegador.
      // es en plural ("caches") porque contiene varios compartimientos...
      // ...diferenciables segun un nombre (en este caso: "cache-p5-iframes")
      const cache = await caches.open("cache-p5-iframes"); // #PROMESA
      console.log("[wrkr log: 1] cache abierta! agregando el codigo!");

      // descarga codigo desde la url y lo guarda en memoria
      // (internamente hace: "fetch" y luego "cache.put")
      return await cache.add(URL_P5); // #PROMESA FINAL que recibe waitUntil
    })() // * funcion iife
  );
};

//////////////////////////////////
// manejador evento fetch
async function interceptarSolicitud(evento) {

  // verificar destino de la solicitud.
  // en caso que NO se trate del link de la libreria: se continua fetch
  if (evento.request.url !== URL_P5) return;

  // en caso contrario (la url coincide): se intercepta (no se realiza)
  // y se intentara responder con informacion de la cache

  evento.respondWith( // *recibe una promesa (aprender "asincronia")
    (async () => { // *invocacion inmediata (aprender "funciones iife")

      // revisa que exista la misma solicitud
      const respuesta0 = await caches.match(evento.request); // #PROMESA 0

      // si existe...
      if (respuesta0) {
        console.log("[wrkr log: 2] leyendo p5 desde la cache!!!");
        return respuesta0; // ...retorna la copia de cache
      }

      // si no existe...
      try { // #caso resolucion okiii

				// ...hubo algun error, asi que se solicita de nuevo
        const respuesta1 = await fetch(evento.request); // #PROMESA 1
        console.log("[wrkr log: 3] resolviendo. nueva solicitud!");

        // intenta acceder al compartimiento de la cache...
        const cache = await caches.open("cache-p5-iframes"); // #PROMESA 2
        console.log("[wrkr log: 4] resolviendo. almacenando respuesta!");

        // ...y lo sobreescribe (clone pq "respuesta" es un flujo)
        await cache.put(evento.request, respuesta1.clone()); // #PROMESA 3

        // se resuleve fetch con nueva respuesta recibida
        return respuesta1; // respondWith recibe PROMESA 1
      }
			catch (error) { // #PROMESAS 1 a 3. caso resolucion nottt
        console.log("[wrkr log: 5] no se pudo resolver. error:\n", error);
      }
    })() // *funcion iife
  );
};

//////////////////////////////////
// EVENTOS INICIADORES DE EJECUCION

// instalacion del worker (primera solicitud)
self.addEventListener("install", escribirCache);

// intercepcion solicitudes de red (para evitar repeticion)
self.addEventListener("fetch", interceptarSolicitud);

//
//
// fin de la plantilla <3
//
////////////////////////////////////////////////////////////////////////