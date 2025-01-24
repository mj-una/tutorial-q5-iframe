const sk5 = document.querySelector('#dsk5');
let manteniendo_sk5 = false;

function iniciarMantener(evento) {
  manteniendo_sk5 = true;
}

function finalizarMantener(evento) {
  manteniendo_sk5 = false;
}

// Inicia el estado al presionar
sk5.addEventListener('pointerdown', iniciarMantener);

// Finaliza el estado al soltar o mover fuera
sk5.addEventListener('pointerup', finalizarMantener);
sk5.addEventListener('pointercancel', finalizarMantener);
sk5.addEventListener('pointerout', finalizarMantener);

// click
sk5.addEventListener('mousedown', iniciarMantener);
sk5.addEventListener('mouseup', finalizarMantener);

// Eventos táctiles
sk5.addEventListener('touchstart', iniciarMantener);
sk5.addEventListener('touchend', finalizarMantener);

// Manejo adicional: si el toque o click sale del sk5
sk5.addEventListener('mouseleave', finalizarMantener);
sk5.addEventListener('touchcancel', finalizarMantener);

