// viewport optimization

//////////////////////////////////
function isInViewport(elem) {
  
  // position from viewport
  const box = elem.getBoundingClientRect();
  
  // border visibility
  const topBorder = box.top >= 0 && box.top <= window.innerHeight;
  const bottomBorder = box.bottom >= 0 && box.bottom <= window.innerHeight;

  // (+) partial
  return topBorder || bottomBorder; 
}

//////////////////////////////////
function iterateIframes() {
  const iframes = document.querySelectorAll(".sk-iframe");

  // for each one...
  for (let i = 0; i < iframes.length; i++) {

    // ...[#2] chech position
    const isFocused = isInViewport(iframes[i]);
    
    // ...[#3] send message
    iframes[i].contentWindow.postMessage({
      focused: isFocused,
      pointer2: manteniendo_sk2,
      pointer5: manteniendo_sk5,
    }, "*");

    // early return
    // if (isFocused) return;
  }
}

//////////////////////////////////
let skipCall = false;
function callsAccess() {

  // access validation
  if (skipCall) return;
  skipCall = true;
  
  // next render
  requestAnimationFrame(() => {
    iterateIframes(); // [#1] controlled call
    skipCall = false;
  });
}

//////////////////////////////////

// first access
window.addEventListener("load", callsAccess);

// scroll y resize (viewport events)
window.addEventListener("scroll", callsAccess);
window.addEventListener("resize", callsAccess);
