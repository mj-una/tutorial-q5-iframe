////////////////////////////////////////////////////////////////////////
//
//
// OPTIMIZACION:
// ALMACENAMIENTO EN CACHE
// 
// texto de 4 lineas
// explicando objetivo de este codigo
// posibilidad de eliminar esta optimizacion
// dificultad de asincronia, workers y cache
//
// link limpio: github.io
//
//////////////////////////////////

// url de la libreria
// EDITABLE: revisar skecths y colocar aqui el link utilizado
const URL_P5 = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.min.js";

//////////////////////////////////
// manejador evento install
async function escribirCache(evento) {
  
  // ejecucion previa a que termine el evento
  evento.waitUntil( // *recibe una promesa (aprender "asincronia") !!!
    (async () => { // *ejecucion inmediata (aprender "funciones iife")

      // el objeto "caches" es parte de la api "cache storage"
      // y permite escribir/leer recursos en memoria local del navegador.
      // es en plural ("caches") porque contiene varios compartimientos...
      // ...diferenciables segun un nombre (en este caso: "p5-cache-v1")
      const cache = await caches.open("p5-cache-v1"); // #PROMESA INTERMEDIA
      console.log("[wrk etapa 1] cache abierta! agregando el codigo!");

      // descarga codigo desde la url y lo guarda en memoria
      // (internamente hace: "fetch" y luego "cache.put")
      await cache.add(URL_P5); // #PROMESA FINAL
    })() // *iife
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
    (async () => { // *ejecucion inmediata (aprender "funciones iife")

      // revisa que exista la misma solicitud
      const respuesta0 = await caches.match(evento.request); // #PROMESA 0

      // si existe...
      if (respuesta0) {
        console.log("[wrk etapa 2] leyendo p5 desde la cache!!!");
        return respuesta0; // ...retorna la copia de cache
      }

      // si no existe...
      try { // #caso resolucion okiii

				// ...hubo algun error, asi que se solicita de nuevo
        const respuesta1 = await fetch(evento.request); // #PROMESA 1
        console.log("[wrk etapa 3] resolviendo. nueva solicitud!");

        // intenta acceder al compartimiento de la cache...
        const cache = await caches.open("p5-cache-v1"); // #PROMESA 2
        console.log("[wrk etapa 4] resolviendo. almacenando respuesta!");

        // ...y lo sobreescribe (clone pq "respuesta" es un flujo)
        await cache.put(evento.request, respuesta1.clone()); // #PROMESA 3

        // se resuleve fetch con nueva respuesta recibida
        return respuesta1; // #PROMESA 3. FINAL
      }
			catch (error) { // #PROMESAS 1 a 3. caso resolucion nottt
        console.log("[wrk etapa 5] no se pudo resolver. error:\n", error);
      }
    })() // *iife
  );
};
//
////////////////////////////////////////////////////////////////////////

// EVENTOS INICIADORES DE EJECUCION

// instalacion del worker (primera solicitud)
self.addEventListener("install", escribirCache);

// intercepcion solicitudes de red (para evitar repeticion)
self.addEventListener("fetch", interceptarSolicitud);

