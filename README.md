# tutorial-p5-iframes

Link de ejemplo: [https://mj-una.github.io/tutorial-p5-iframes/](https://mj-una.github.io/tutorial-p5-iframes/)

<hr>

Recomiendo muchisimo aprender a usar iframes y la api postMessage. Esta el codigo comentado paso a paso explicado en "[optmViewport.js](https://github.com/mj-una/tutorial-p5-iframes/blob/main/optmViewport.js)" para una comunicacion basica entre la pagina principal y los sketchs anidados.

Se pueden hacer cosas muuuy geniales con esto, por ejemplo que al hacer click en la pagina principal suceda algo dentro del sketch, o escribir en un input y que se vayan dibujandose las letras. Para ese tipo de cosas hay que aprender sobre los eventos del navegador.

Me gusta el concepto porque resuelve temas dificiles (como los contextos de ejecucion) con herramientas simples de usar. No se necesita mucho javascript, un par de lineas para enviar la informacion y otro par para recibirla. El resto depende de meterle imaginacion con p5 y armar una pagina bonita con css. 

<hr>

Para entender la parte de optimizacion de cache es necesario sufrir la asincronia. Inclui tres versiones del worker:
- uno usando solo promesas
- otro usando solo async/await
- y el definitivo: uno para manejar varios links a la vez, usando async/await y Promise.all

Si te animas te recomiendo arrancar por entender el event loop con callbacks simples (tipo setTimeout), luego pasar a las promesas (aunque sean un laberinto jaja) y de ultimo lo mejor: el async/await, que por dentro siii, tambien son promesas!

Yo aprendi a partir de este video: [4tomik en youtube](https://youtu.be/dX2lThXc0p4?si=pHalDVe4enRAyWpg)

<hr>

Ahora estoy preparando unos videitos para mostrar como copiar y pegar el codigo. Voy a usar la misma plantilla pero con una libreria que se llama q5 (que optimiza todo para que sea mas liviano).

Y quiero publicarlos en una version mas avanzada de esta misma plantilla que incluya lazy loading para los iframes y un manejo preciso del snap-scroll (calculado con javascript).

<hr>

**Cualquier duda me pueden preguntarrr. Yo feliz de conversar sobre este codigo o de ayudar a adaptarlo a otros proyectos.**