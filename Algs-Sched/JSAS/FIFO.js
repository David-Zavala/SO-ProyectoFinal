function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const MAX_QUEUE_SIZE = 6;

class Queue {
    constructor() {
    this.elements = [];
    this.front = -1;
    this.rear = -1;
    }

    enqueue(element) {
    this.rear++;
    this.elements[this.rear] = element;
    }

    dequeue() {
    this.front++;
    const element = this.elements[this.front];
    return element;
    }
}

async function ejecutarfifo() {
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

    const queue = new Queue();

    const inputs = document.querySelectorAll(".PIDfifo");

    for (let i = 0; i < inputs.length; i++) {
    const pid = inputs[i].value;
    if (pid !== "") {
        const element = {
        pid: pid,
        exec_time: Math.floor(Math.random() * 5) + 1,
        };
        queue.enqueue(element);
    }
    }
    
    const pidrs = document.querySelectorAll('.PIDrfifo');
    const ctrs = document.querySelectorAll('.C_Trfifo');
    const ttr = document.querySelector('.TT_Rfifo');
    
    let clockInput = document.querySelector('.clock');
    let clockValue = clockInput.value;
    if (clockValue == 0) startClock();
    
    stopClock();
    startClock();

    let i = 0;
    while (queue.front !== queue.rear) {
    const elementoDesencolado = queue.dequeue();
    pidrs[i].value = elementoDesencolado.pid;
    await sleep(elementoDesencolado.exec_time * 1000);
    clockInput = document.querySelector('.clock');
    clockValue = clockInput.value;
    ctrs[i].value = clockValue;
    i++;
    }
    ttr.value = clockValue;
    stopClock();
}