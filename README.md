# <br>tutorial-q5-iframes

<br>

INSTRUCCIONES PASO A PASO

1.  **Crea tu propio proyecto**: una carpeta con un index.html en su nivel principal (la raiz).

2.  **Hace la pagina que queras**: metiendole diseño, tipografias, estilos, interacciones, etc. Cada sketch se incrustará dentro de un iframe, que es como un bloque cualquiera (podes maquetarlo como si fuera un div), pero tene en cuenta que **siempre debe mantener la misma proporcion de aspecto que el canvas de q5** (lee la explicacion de [ejemplo.css](https://github.com/mj-una/tutorial-q5-iframes/blob/main/ejemplo.css)).

3.  **Copia el archivo [optmCacheParale.js](https://github.com/mj-una/tutorial-q5-iframes/blob/main/optmCacheParale.js)** y pegalo en la raiz de tu proyecto. Luego ajusta la lista del principio. Hay que pegar ```"entre", "comillas", "y", "separados", "por", "coma"``` los links de la/s librerias/s que usas en tus sketchs. Estos son los que estan en las etiquetas ```<script>``` del ```<head>``` de los .html (generalmente son la libreria de q5 o la de p5.sound). Es importante que en la lista de urls coloques exactamente las mismas versiones.

4.  **Copia el bloque de codigo marcado como "\<!-- OPTIMIZACION DE CACHE -->"** desde el [index.html](https://github.com/mj-una/tutorial-q5-iframes/blob/main/index.html) de este proyecto hacia el index.html de la raiz tu proyecto. Buscalo justo antes del final del ```<head>```, son 7 lineas de javascript.

5. **Copia el archivo [optmViewport.js](https://github.com/mj-una/tutorial-q5-iframes/blob/main/optmViewport.js)** y pegalo en la raiz de tu proyecto. Luego cambia la primera variable a ```true``` o ```false``` segun el modo que prefieras (mas info [aqui](https://mj-una.github.io/tutorial-q5-iframes/#explicacion)). En este archivo ademas tenes que borrar los ultimos 5 bloques del codigo (fijate los comentarios).

6.  **Prepara tus sketchs:** coloca cada uno en una carpeta con su nombre (no usar ni la letra "ñ" ni tildes ni espacios; solo letras ascii, numeros y guiones).
- > DENTRO DE CADA CARPETA: Te recomiendo que copies el [index.html](https://github.com/mj-una/tutorial-q5-iframes/tree/main/sketchs/1-primer-sketch/index.html) de los sketchs de ejemplo y ajustes solamente los links a librerias en el ```<head>```. **No agregues estilos, ni contenido en el body.** Para el codigo javascript segui las instrucciones de [sketch.js](https://github.com/mj-una/tutorial-q5-iframes/tree/main/sketchs/1-primer-sketch/sketch.js). Ahi encontraras una funcion que debes copiarla completa y llamarla justo despues de createCanvas. Los pasos importantes estan comentados con este signo: ```[ $$ ]```.

7. **Crea una subcarpeta "sketchs"** en la raiz de tu proyecto y pegale adentro las carpetas contenedoras de cada uno de los sketchs (que en su interior deben de tener: al menos un index.html y un sketch.js, y aparte: todos los archivos y subcarpetas extras que cada skecth pueda necesitar).

8. **IMPORTANTISIMOOO:** ajusta las etiquetas ```<iframe>``` en tu pagina. Estas son las ventanas desde las que se visualizaran tus dibujos. Deben tener:
  - >OBIGATORIO -> **un atributo ```src``` con la ruta al .html del sketch** (como en la plantilla: ```src="sketchs/2-segundo-sketch/index.html"```, pero con la ruta a tu propio archivo)
  - >OBIGATORIO -> **un atributo class con valor "sk-iframe"** para que pueda ser capturado desde optmViewport.js y desde css.
  - >OPCIONAL -> un id por si necesitas hacer cosas mas especificas (por ejemplo, ponerle medidas distintas a cada iframe).

9. LISTO ! ! ! **Para subirlo como una pagina** en github segui [este tutorial](https://github.com/mj-una/tutorial-p5-responsive/blob/main/github.md) (desde el paso 5 al 17).

10. **Preguntame cualquier duda.** Yo feliz de conversar sobre la plantilla o de ayudar a adaptarla a otros proyectos.

<hr>

<br>

## Link del ejemplo:<br>[https://mj-una.github.io/tutorial-q5-iframes/](https://mj-una.github.io/tutorial-q5-iframes/)

<br>

Recomiendo muchisimo aprender a usar iframes y la api postMessage. En [optmViewport.js](https://github.com/mj-una/tutorial-q5-iframes/blob/main/optmViewport.js) esta comentado paso a paso para una comunicacion basica entre la pagina principal y los sketchs anidados.

Se pueden hacer cosas muuuy geniales con esto, por ejemplo que con un click en la pagina suceda algo dentro del sketch, o escribir en un input y que se vayan dibujando las letras (*aprender sobre los [eventos del navegador](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/Events)).

Me gusta el concepto de los iframes porque resuelven temas dificiles (como los contextos de ejecucion) con herramientas simples de usar. No se necesita mucho javascript, un par de lineas para enviar la informacion y otro par para recibirla. El resto depende de meterle imaginacion con q5 y armar una pagina bonita con css. 

<hr>

<br>

Para entender la parte de optimizacion de cache es necesario sufrir la asincronia. Inclui tres versiones del worker:
- uno usando solo promesas
- otro usando solo async/await
- y el definitivo: uno para manejar varios links en paralelo (usando async/await y Promise.all)

Si te animas a aprender te recomiendo arrancar por el event loop con callbacks simples (tipo setTimeout), luego pasar a las promesas (que son un laberinto jaja) y de ultimo lo mejor: el async/await, que por dentro siii, tambien son promesas!

Yo aprendi a partir de este video: [4tomik en youtube](https://youtu.be/dX2lThXc0p4?si=pHalDVe4enRAyWpg)

<hr>

<br>

Ahora estoy preparando una explicacion interactiva sobre cómo copipastear los bloques del codigo. Para los canvas voy a usar una libreria que se llama q5. Es muy similar a p5 pero esta enfocada en alto rendimiento.

Quiero publicarlos en una version mas avanzada de esta mimsma plantilla, que incluya lazy loading para los iframes y un manejo preciso del snap-scroll (calculado con javascript).

<hr>

<br>

**Todo el texto y el codigo esta escrito por mi.<br>Los publico bajo cc0 - al dominio publico.<br>No es necesario citar autoria.**
