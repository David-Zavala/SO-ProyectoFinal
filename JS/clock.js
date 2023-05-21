let timerId; // Variable para almacenar el identificador del temporizador
let seconds = 0; // Variable para contar los segundos

// Función para iniciar el reloj
function startClock() {
  // Actualizar el valor inicial del input
  document.querySelector('.clock').value = seconds;

  // Incrementar los segundos cada segundo
  timerId = setInterval(() => {
    seconds++;
    document.querySelector('.clock').value = seconds;
  }, 1000);
}

// Función para detener el reloj y reiniciarlo a cero
function stopClock() {
  clearInterval(timerId);
  document.querySelector('.clock').value = seconds;
}

// Función para reiniciar el reloj
function resetClock() {
    seconds = 0;
    document.querySelector('.clock').value = seconds;
}
// Ejemplo de uso:
startClock(); // Iniciar el reloj
// Detener el reloj después de 10 segundos (10000 milisegundos)
setTimeout(() => {
  stopClock();
}, 10000);
