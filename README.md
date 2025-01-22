# <br>tutorial-q5-iframes

<br>

INSTRUCCIONES PASO A PASO

1.  **Crea tu propio proyecto**: una carpeta con un index.html en su nivel principal (la raiz).

2.  **Hace la pagina que queras**: metiendole diseño, tipografias, estilos, interacciones, etc. Tene en cuneta que cada sketch se incrustará dentro de un iframe, que podes maquetarlo como un bloque cualquiera pero siempre tiene que mantener **la misma proporcion de aspecto que el canvas de q5** (lee la explicacion de "[ejemplo.css](https://github.com/mj-una/tutorial-q5-iframes/blob/main/ejemplo.css)"). Casi todos los estilos son para el ejemplo de la pagina que hice, excepto los que estan comentados (que son los realmente importantes).

3.  **Copia el archivo "[optmCacheParale.js](https://github.com/mj-una/tutorial-q5-iframes/blob/main/optmCacheParale.js)"** y ajusta la lista del principio. Hay pegar "entre", "comillas", "y", "separados", "por", "coma" los links de la/s librerias/s que usas en tus sketchs. Estos son los que esten en la etiqueta ```<script>``` del ```<head>``` de los index.html (generalmente son la libreria de q5 o la de p5.sound, y es importante que sean exactamente la misma version).

4.  **Copia el bloque de codigo marcado como "\<!-- OPTIMIZACION DE CACHE -->"** en el [index.html](https://github.com/mj-una/tutorial-q5-iframes/blob/main/index.html) de este proyecto. Buscalo justo al final del ```<head>```, son 7 lineas de javascript.

5. **Copia el archivo "[optmViewport.js](https://github.com/mj-una/tutorial-q5-iframes/blob/main/optmViewport.js)"** y ajusta la primera variable (con true o false) segun el modo que prefieras. Lee las instrucciones y mira la demo [aqui](https://mj-una.github.io/tutorial-q5-iframes/#explicacion).

6.  **Prepara tus sketchs:** coloca cada uno en una carpeta con su nombre (sin espacios, solo letras, numeros y guiones). Te recomiendo que copies el "[index.html](https://github.com/mj-una/tutorial-q5-iframes/tree/main/sketchs/primerSketch/index.html)" de los sketchs de ejemplo y ajustes solamente los links a librerias en el ```<head>```. **No agregues estilos, ni contenido en el body.** Para el codigo javascript sigue las instrucciones de "[sketch.js](https://github.com/mj-una/tutorial-q5-iframes/tree/main/sketchs/primerSketch/sketch.js)". Ahi encontraras una funcion que debes copiar completa y llamarla justo despues de createCanvas. Los pasos importantes estan comentados con este signo: ```[ $$ ]```.

7. **Crea una subcarpeta "skecths"** en la raiz de tu proyecto y pega adentro las carpetas contenedoras de cada uno de los skecths (que en su interior deben de tener al menos un index.html y un sketch.js, mas todos los archivos y subcarpetas extras que el skecth pueda necesitar).

8. **IMPORTANTISIMOOO:** crea las etiquetas ```<iframe>``` en tu pagina. Estos son las ventanas desde las que se visualizaran tus dibujos. Deben tener:
  - >**un atributo ```src``` con la ruta al .html del sketch** (como en el ejemplo: src="sketchs/5-quinto-sketch/index.html")
  - >**un atributo class con valor "sk-iframe"** para que pueda ser capturado desde optmViewport.js y desde css (como en el ejemplo: class="sk-iframe")
  - >y, a veces, un id para cuando necesites asignarle una medida diferente que a los demas iframes o hacer cosas mas especificas.

9. LISTO ! ! ! **Para subirlo como una pagina** en github podes seguir [este tutorial](https://github.com/mj-una/tutorial-p5-responsive/blob/main/github.md) (desde el paso 5 al 17).

10. **Preguntame cualquier duda.** Yo feliz de conversar sobre esta plantilla o de ayudar a adaptarla a otros proyectos.

<hr>

<br>

Link del ejemplo:<br>[https://mj-una.github.io/tutorial-q5-iframes/](https://mj-una.github.io/tutorial-q5-iframes/)

<hr>

<br>

Recomiendo muchisimo aprender a usar iframes y la api postMessage. Esta el codigo comentado paso a paso explicado en "[optmViewport.js](https://github.com/mj-una/tutorial-q5-iframes/blob/main/optmViewport.js)" para una comunicacion basica entre la pagina principal y los sketchs anidados.

Se pueden hacer cosas muuuy geniales con esto, por ejemplo que al hacer click en la pagina principal suceda algo dentro del sketch, o escribir en un input y que se vayan dibujandose las letras. Para ese tipo de cosas hay que aprender sobre los eventos del navegador.

Me gusta el concepto porque resuelve temas dificiles (como los contextos de ejecucion) con herramientas simples de usar. No se necesita mucho javascript, un par de lineas para enviar la informacion y otro par para recibirla. El resto depende de meterle imaginacion con q5 y armar una pagina bonita con css. 

<hr>

<br>

Para entender la parte de optimizacion de cache es necesario sufrir la asincronia. Inclui tres versiones del worker:
- uno usando solo promesas
- otro usando solo async/await
- y el definitivo: uno para manejar varios links a la vez, usando async/await y Promise.all

Si te animas te recomiendo arrancar por entender el event loop con callbacks simples (tipo setTimeout), luego pasar a las promesas (aunque sean un laberinto jaja) y de ultimo lo mejor: el async/await, que por dentro siii, tambien son promesas!

Yo aprendi a partir de este video: [4tomik en youtube](https://youtu.be/dX2lThXc0p4?si=pHalDVe4enRAyWpg)

<hr>

<br>

Ahora estoy preparando unos videitos para mostrar como copiar y pegar el codigo. Voy a usar la misma plantilla pero con una libreria que se llama q5 (que optimiza todo para que sea mas liviano).

Y quiero publicarlos en una version mas avanzada de esta misma plantilla que incluya lazy loading para los iframes y un manejo preciso del snap-scroll (calculado con javascript).

<hr>

<br>

**Los textos y el codigos los escribi yo.<br>Publicado bajo cc0. Al dominio publico.<br>No es necesario citar autoria.**