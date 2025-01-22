# <br>tutorial-q5-iframes

<br>

INSTRUCCIONES PASO A PASO

1.  **Crea tu propio proyecto**: una carpeta con un index.html en su nivel principal (la raiz).

2.  **Hace la pagina que queras**: metiendole diseño, tipografias, estilos, interacciones, etc. Cada sketch se incrustará dentro de un iframe, que es como un bloque cualquiera (podes maquetarlo como si fuera un div), pero tene en cuenta que **siempre debe mantener la misma proporcion de aspecto que el canvas de q5** (lee la explicacion de [ejemplo.css](https://github.com/mj-una/tutorial-q5-iframes/blob/main/ejemplo.css)).

3.  **Copia el archivo [optmCacheParale.js](https://github.com/mj-una/tutorial-q5-iframes/blob/main/optmCacheParale.js)** y pegalo en la raiz de tu proyecto. Luego ajusta la lista del principio. Hay que pegar ```"entre", "comillas", "y", "separados", "por", "coma"``` los links de la/s libreria/s que usas en tus sketchs. Estos son los que estan en las etiquetas ```<script>``` del ```<head>``` de los .html (generalmente son la libreria de q5 o la de p5.sound). Es importante que en la lista de urls coloques exactamente las mismas versiones.

4.  **Copia el bloque de codigo marcado como "\<!-- OPTIMIZACION DE CACHE -->"** desde este [index.html](https://github.com/mj-una/tutorial-q5-iframes/blob/main/index.html) hacia el index.html de la raiz tu proyecto. Buscalo justo antes del final del ```<head>```, son 7 lineas de javascript.

5. **Copia el archivo [optmViewport.js](https://github.com/mj-una/tutorial-q5-iframes/blob/main/optmViewport.js)** y pegalo en la raiz de tu proyecto. Luego cambia la primera variable a ```true``` o ```false``` segun el modo que prefieras (mas info [aqui](https://mj-una.github.io/tutorial-q5-iframes/#explicacion)). En este archivo ademas tenes que borrar los ultimos 5 bloques del codigo (fijate los comentarios).

6.  **Prepara tus sketchs:** coloca los archivos en una carpeta con el nombre del sketch (no usar ni la letra "ñ" ni tildes ni espacios; solo letras ascii, numeros y guiones).

- > DENTRO DE CADA CARPETA CONTENEDORA -> Te recomiendo que copies el [index.html](https://github.com/mj-una/tutorial-q5-iframes/tree/main/sketchs/1-primer-sketch/index.html) de los sketchs del ejemplo y que ajustes solamente los links a librerias en el ```<head>```. **No agregues estilos, ni contenido en el body.** Para el codigo javascript segui las instrucciones de [sketch.js](https://github.com/mj-una/tutorial-q5-iframes/tree/main/sketchs/1-primer-sketch/sketch.js). Ahi encontraras una funcion que debes copiarla completa y llamarla justo despues de createCanvas. Los pasos importantes estan comentados con este signo: ```[ $$ ]```.

7. **Crea una subcarpeta "sketchs"** en la raiz de tu proyecto y pegale adentro todas las carpetas contenedoras del paso anterior (que en su interior deben de tener al menos: un index.html y un sketch.js; y de extra: todos los archivos y subcarpetas que cada skecth pueda necesitar).

8. **IMPORTANTISIMOOO:** ajusta las etiquetas ```<iframe>``` de tu pagina principal. Estas son _mini ventanas incrustadas_ desde las que se visualizan tus dibujos. Deben tener:

  - >OBIGATORIO -> **el atributo ```src``` con la ruta al .html del sketch** (como en la plantilla: ```src="sketchs/3-tercer-sketch/index.html"```, pero con la ruta a tu propio archivo).

  - >OBIGATORIO -> **el atributo ```class="sk-iframe"```** para que pueda ser capturado desde optmViewport.js y desde css. Podes cambiar el valor, pero recuerda modificar los demas archivos tambien.

  - >OPCIONAL -> el atributo ```id``` para **personalizaciones**. Por si necesitas ponerle estilos distintos a cada iframe o capturarlos desde el dom.
  
  - >OPCIONAL -> el atributo ```loading="lazy"``` para **performance**. Esto hace que el contenido sea solicitado recien cuando el iframe se vaya acercando al viewport, lo que reduce el tiempo de arranque de la pagina. **Pero ojo!!!** no lo agregues en los iframes que sean visibles desde el inicio (fijate en el ejemplo: los dos primeros iframes no lo tienen). 

  - >OPCIONAL -> los atributos ```title="Nombre de tu sketch"``` y ``` aria-label="Descripcion de tu sketch"``` para **accesibilidad**. Asi los lectores de pantalla pueden retornar algo.

  - >OPCIONAL -> los atributos ```sandbox="allow-scripts allow-same-origin"```, ```referrerpolicy="same-origin"``` y ```crossorigin="anonymous"``` para **seguridad y privacidad**. Limita comportamientos peligrosos, protege datos sensibles y evita enviar información extra en solicitudes externas. **Pero ojo!!!** podrían llegar a bloquear varias cosas, como la captura de eventos o la carga de librerías externas. Investiga sobre el tema y decide de acuerdo a tu contexto. En el ejemplo —como se trata de un código que conozco— prefiero no restringir nada.

  - >OPCIONAL -> **contenido html alternativo** para mostrar caso de error al cargar el iframe. Se coloca entre la etiqueta de apertura y la de cierre (puede ser un texto, un una imagen, otro iframe, etc).

  - >OPCIONAL -> no uses los atributos ```witdh``` y ```height```. Es mucho mejor manejar las medidas desde css!!!

  - Ejemplo:
    ```
    <iframe
      src="sketchs/3-tercer-sketch/index.html"
      class="sk-iframe"
      id="sk3"
      loading="lazy">
      Hubo un error! (contenido alternativo)
    </iframe>
    ```

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
