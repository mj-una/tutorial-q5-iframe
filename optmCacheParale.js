////////////////////////////////////////////////////////////////////////
//
//
// PLANTILLA: OPTIMIZACION CACHE (version paralela)
// sirve para decargar varias librerias en memoria local
//
// version sin comentarios (menos spam, pero se pierde el chisme):
// https://github.com/mj-una/tutorial-p5-iframes/blob/limpio/optmCacheParale.js 
//
//////////////////////////////////

/* ~ */ /* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  **  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */ /* ~ */
/* ~ */ /* ~ ~ ~ ~ ~ ~ Ajuste De Las Urls!! ~ ~ ~ ~ ~ ~ */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*   Copia y pega en la lista todos los links   */ /* ~ */
/* ~ */ /*   de las librerias que usas en tus sketchs   */ /* ~ */
/* ~ */                                                    /* ~ */
const LISTA_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.min.js",
];
/* ~ */                                                    /* ~ */
/* ~ */ /*                                              */ /* ~ */
/* ~ */ /*   P.D: acordate que en un array de strings   */ /* ~ */
/* ~ */ /*    se separa cada cadena con una coma (,)    */ /* ~ */
/* ~ */ /*            y se usan comillas (")            */ /* ~ */
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
      const cache = await caches.open("cache-p5-iframes"); // #PROMESA INICIAL
      console.log("[wrk log 1] cache abierta! agregando las librerías!");

      // iniciar promesas de cacheo
      async function cachearUrl(url) {
        try {
          await cache.add(url); // retona promesa exitosa
          console.log(`[wrkr log 1.2] ${url} se guardo exitosamente.`);
        }
        catch (error) { // notifica error por separado
          console.error(`[wrkr log 1.2] error al guardar ${url}\n`, error);
        }
      }

      // para almacenar las promesas
      const promesas = [];

      // recorre cada url de la lista
      for (const URL of LISTA_URLS) { 
        console.log(`[wrkr log 1.1] preparando para cachear ${URL}`);
        
        // iniciar promesa. Ojo: no se usa await en la llamada,
        // por lo que no se espera la resolucion (asi sigue a siguiente url)
        const promesa = cachearUrl(URL);
        
        // agrega promesa a arreglo
        promesas.push(promesa);
      }

      // espera a que todas las promesas terminen
      await Promise.all(promesas); // (los errores se manejaron por separado)
      console.log("[wrkr log 1.3] todas las urls han sido procesadas!");
    })() // *funcion iife
  );
}



//////////////////////////////////
// manejador evento fetch
async function interceptarSolicitud(evento) {

  // verificar destino de la solicitud.
  // en caso que NO se trate de una url de la lista:
  // salida temprana del manejador y se continua el fetch
  if (!LISTA_URLS.includes(evento.request.url)) return;

  // en caso contrario (alguna url coincide): se intercepta la solicitud
  // y se intenta responder con informacion desde la cache (sin fetch)

  evento.respondWith( // *recibe una promesa (aprender "asincronia")
    (async () => { // *invocacion inmediata (aprender "funciones iife")

      // revisa que exista la misma solicitud
      const respuesta0 = await caches.match(evento.request); // #PROMESA 0

      // si existe...
      if (respuesta0) {
        console.log(`[wrkr log: 2] leyendo ${evento.request.url} desde cache!`);
        return respuesta0; // ...se retorna la copia de cache
      }

      // si no existe, hubo algun error...
      console.log(`[wrkr log: 3] error con ${evento.request.url}. manejo:`);
      
      // ...y se intenta resolver con un nuevo fetch
      try { // #caso okiii

				// repetir solicitud
        const respuesta1 = await fetch(evento.request); // #PROMESA 1
        console.log("[wrkr log: 3.1] resolviendo. nueva solicitud enviada!");

        // intenta acceder al compartimiento de la cache...
        const cache = await caches.open("cache-p5-iframes"); // #PROMESA 2
        console.log("[wrkr log: 3.2] resolviendo. almacenando respuesta!");

        // ...y lo sobreescribe. se usa clone para fijar texto temporal
        // pq fetch ("respuesta1") es un flujo de datos, para una sola lectura
        await cache.put(evento.request, respuesta1.clone()); // #PROMESA 3
        console.log("[wrkr log: 3.3] todo oki. problema resuelto!");

        // se resuleve fetch con nueva respuesta recibida
        return respuesta1; // finalmente respondWith recibe PROMESA 1
      }
			catch (error) { // #caso nottt
        console.error("[wrkr log: 3] no se pudo resolver. error:\n", error);
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