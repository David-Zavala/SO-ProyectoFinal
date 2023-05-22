function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const MAX_QUEUE_SIZE = 6;

// Estrcutura de la Queue
class Queue {
    constructor() {
    this.elements = [];
    this.front = -1;
    this.rear = -1;
    }

    // Funcion para encolar
    enqueue(element) {
    this.rear++;
    this.elements[this.rear] = element;
    }

    // Funcion para desencolar
    dequeue() {
    this.front++;
    const element = this.elements[this.front];
    return element;
    }
}

// Ejecución de procedimiento principal
async function ejecutarfifo() {
    // Setear todos los resultados a 0 para limpiar los inputs de resultados
    const set0pidrs = document.querySelectorAll('.PIDrfifo');
    const set0ctrs = document.querySelectorAll('.C_Trfifo');
    const set0tt = document.querySelector('.TT_Rfifo');
    
    set0pidrs.forEach(element => {
    element.value = "";
    });
    set0ctrs.forEach(element => {
    element.value = "";
    });
    set0tt.value = "";
    // --------------------------
    //Crear Queue
    const queue = new Queue();

    // Tomar todos los PID's
    const inputs = document.querySelectorAll(".PIDfifo");

    // Checar cuales son los que sí tienen un PID
    for (let i = 0; i < inputs.length; i++) {
    const pid = inputs[i].value;
    if (pid !== "") {
        const element = {
        pid: pid,
        exec_time: Math.floor(Math.random() * 5) + 1,
        };
        // Encolar procesos
        queue.enqueue(element);
    }
    }
    
    // Recojer los inputs para desplegar los resultados
    const pidrs = document.querySelectorAll('.PIDrfifo');
    const ctrs = document.querySelectorAll('.C_Trfifo');
    const ttr = document.querySelector('.TT_Rfifo');
    
    // Si el reloj no esta iniciado, iniciarlo
    let clockInput = document.querySelector('.clock');
    let clockValue = clockInput.value;
    if (clockValue == 0) startClock();
    
    // Verificar que el reloj no este detenido
    stopClock();
    startClock();

    // Desencolar procesos y desplegarlos
    let i = 0;
    const message = document.querySelector(".messagesFIFO");
    while (queue.front !== queue.rear) {
        const elementoDesencolado = queue.dequeue();
        pidrs[i].value = elementoDesencolado.pid;
        // Tiempo de espera para simular la ejecución
        for (let s = 0; s < elementoDesencolado.exec_time; s++){
            let inter = document.querySelector('.interrupt').value
            if (inter > 0){
              switch (inter){
                case '1':
                  message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${elementoDesencolado.pid}, a través de SVC I/O">`;
                  break;
                case '2':
                  message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${elementoDesencolado.pid}, a traves de SVC Normal">`;
                  break;
                case '3':
                  message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${elementoDesencolado.pid}, a traves de un error del programa">`;
                  break;
                case '4':
                  message.innerHTML += `<input disabled readonly class="form-control" value="El proceso: ${elementoDesencolado.pid}, se ha convertido en un proceso Zoombie">`;
                  break;
                case '5':
                  message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${elementoDesencolado.pid} abruptamente">`;
                  break;
              }
              s = elementoDesencolado.exec_time + 10;
              await sleep(1000);
            }
            else
              await sleep(1000);
        }
        if (document.querySelector('.interrupt').value == 0)message.innerHTML += `<input disabled readonly class="form-control" value="Proceso: ${elementoDesencolado.pid} COMPLETADO">`;
        clockInput = document.querySelector('.clock');
        clockValue = clockInput.value;
        ctrs[i].value = clockValue;
        i++;
        document.querySelector('.interrupt').value = 0;
    }
    ttr.value = clockValue;
    stopClock();
}