# tutorial-p5-iframes

Link de ejemplo: [https://mj-una.github.io/tutorial-p5-iframes/](https://mj-una.github.io/tutorial-p5-iframes/)

<hr>

Recomiendo muchisimo aprender a usar iframes y la api postMessage. Esta todo el paso a paso explicado en "[optmViewport.js](https://github.com/mj-una/tutorial-p5-iframes/blob/main/optmViewport.js)" para una comunicacion basica entre la pagina principal y los sketchs anidados.

Se pueden hacer cosas muuuy geniales con esto. Me gusta el concepto porque se resuelven temas dificiles (como los contextos de ejecucion) con herramientas simples de usar. No se necesita mucho mas javascript que lo de la plantilla. Todo el resto depende de meterle imaginacion con p5 y armar una pagina bonita con css. 

<hr>

Para entender la parte de optimizacion de cache es necesario sufrir con la asincronia. Inclui dos versiones del mismo worker: uno hecho solo con promesas y otro usando async/await. Recomiendo arrancar por entender el event loop con callbacks simples (tipo setTimeout), luego pasar a las promesas (aunque sean un laberinto jaja) y para el ultimo lo mejor: el async/await (que por dentro siii, tambien son promesas!)

Yo aprendi jugando a partir de este video: [4tomik en youtube](https://youtu.be/dX2lThXc0p4?si=pHalDVe4enRAyWpg)

Ahora estoy preparando un worker mas avanzado que pueda manejar varios links al mismo tiempo (con promesas paralelas). Lo subo pronto. Luego quiero hacer otra plantilla para lazy loading y luego otra para snap-scroll avanzado (calculado exacto desde javascript).

<hr>

Cualquier duda me pueden preguntarrr. Yo feliz de conversar sobre este codigo o de ayudar a adaptarlo a otros proyectos