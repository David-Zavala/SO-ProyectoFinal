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
    while (queue.front !== queue.rear) {
    const elementoDesencolado = queue.dequeue();
    pidrs[i].value = elementoDesencolado.pid;
    // Tiempo de espera para simular la ejecución
    await sleep(elementoDesencolado.exec_time * 1000);
    clockInput = document.querySelector('.clock');
    clockValue = clockInput.value;
    ctrs[i].value = clockValue;
    i++;
    }
    ttr.value = clockValue;
    stopClock();
}