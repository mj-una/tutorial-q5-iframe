const sk2 = document.querySelector('#dsk2');
let manteniendo_sk2 = false;

function iniciarMantener(evento) {
  manteniendo_sk5 = true;
  console.log("ini_sk2");
}

function finalizarMantener(evento) {
  manteniendo_sk5 = false;
  console.log("fin_sk2");
}

// Inicia el estado al presionar
sk5.addEventListener('pointerdown', iniciarMantener);

// Finaliza el estado al soltar o mover fuera
sk5.addEventListener('pointerup', finalizarMantener);
sk5.addEventListener('pointercancel', finalizarMantener);
sk5.addEventListener('pointerout', finalizarMantener);

