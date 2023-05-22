function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Process {
    constructor(pid, arrivalTime, burstTime, priority) {
        this.pid = pid;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
        this.remainingTime = burstTime;
        this.waitTime = 0;
        this.turnaroundTime = 0;
        this.responseTime = 0;
        this.queueLevel = 0;
    }
}

function sortByPriority(a, b) {
    if (a.priority == b.priority) {
        return a.arrivalTime - b.arrivalTime;
    }
    return a.priority - b.priority;
}

// Funcion que simula el scheduling de MLFQ
async function simulateMLFQ(processes, numQueues, timeQuantum) {
    
    // Si el reloj no esta iniciado, iniciarlo
    let clockInput = document.querySelector('.clock');
    let clockValue = clockInput.value;
    if (clockValue == 0) startClock();
    
    // Verificar que el reloj no este detenido
    stopClock();
    startClock();

    let queues = Array.from({length: numQueues}, () => []);
    // Agregamos todos los procesos al Q1
    for(let i = 0; i < processes.length; i++) {
        processes[i].queueLevel = 0;
        queues[0].push(processes[i]);
    }

    // Variables de conteo
    let currentTime = 0;
    let totalWaitTime = 0;
    let totalTurnaroundTime = 0;
    let totalResponseTime = 0;
    let completedProcesses = 0;

    // Inicia loop de proceso
    while(completedProcesses < processes.length) {
        let foundProcess = false;

        // Checar cada Q para un proceso a ejecutar
        for(let i = 0; i < numQueues; i++) {
            if(!queues[i].length) continue;
            foundProcess = true;

            // Obtener proceso
            let currentProcess = queues[i].shift();
        
            // Calcular tiempo de respuesta del proceso
            if(currentProcess.remainingTime === currentProcess.burstTime) {
                currentProcess.responseTime = currentTime - currentProcess.arrivalTime;
                totalResponseTime += currentProcess.responseTime;
                displayResult(processes, currentTime, currentProcess);
            }

            // Ejecutar hasta el quantum o hasta que se termine
            let executionTime = Math.min(timeQuantum[i], currentProcess.remainingTime);
            await sleep(executionTime * 1000);
            currentTime += executionTime;
            currentProcess.remainingTime -= executionTime;
            displayResult(processes, currentTime, currentProcess);

            // Agregar los procesos aun no completados a la cola y asignarles nueva prioridad
            if(currentProcess.remainingTime > 0) {
                if(i < numQueues - 1) {
                    currentProcess.priority++;
                    currentProcess.waitTime = 0;
                    currentProcess.queueLevel++;
                    displayResult(processes, currentTime, currentProcess);
                }
                queues[currentProcess.queueLevel].push(currentProcess);
            } else {
                // Calcula nuevos tiempos de espera y de turnaround
                currentProcess.waitTime = currentTime - currentProcess.arrivalTime - currentProcess.burstTime;
                currentProcess.turnaroundTime = currentTime - currentProcess.arrivalTime;
                totalWaitTime += currentProcess.waitTime;
                totalTurnaroundTime += currentProcess.turnaroundTime;
                completedProcesses++;
                displayResult(processes, currentTime, currentProcess);
            }
            break;
        }

        // No se encontro proceso
        if(!foundProcess) {
            await sleep(1000);
            currentTime++;
        }
    }

    //Terminacion de simulacion de scheduling
    displayResult(processes, currentTime, currentProcess);
    stopClock();
}


async function ejecutarMLFQ() {
    const numQueues = 3;
    const timeQuantum = [];
    timeQuantum[0] = parseInt(document.getElementsByClassName("Q_Q")[0].value);
    timeQuantum[1] = parseInt(document.getElementsByClassName("Q_Q")[1].value);
    timeQuantum[2] = parseInt(document.getElementsByClassName("Q_Q")[2].value);

    const n = document.getElementsByClassName("PIDMLFQ").length;
    let processes = [];

    for (let i = 0; i < n; i++) {
        let burstTime = parseInt(document.getElementsByClassName("mlfqB_T")[i].value);
        let arrivalTime = parseInt(document.getElementsByClassName("mlfqA_T")[i].value);
        let priority = parseInt(document.getElementsByClassName("mlfqP")[i].value);

        if (isNaN(burstTime) || isNaN(arrivalTime) || isNaN(priority)) {
            continue;
        }

        processes.push(new Process(i + 1, arrivalTime, burstTime, priority));
    }
    processes.sort(sortByPriority);

    await simulateMLFQ(processes, numQueues, timeQuantum);
    document.getElementById("mensaje").style.display = "block";
}


function displayResult(processes, currentTime, currentProcess) {
    processes.sort(sortByPriority);
    console.log(currentProcess);
    console.log(currentTime);
    const currTime = document.getElementsByClassName('mlfqCurrT');
    const currPid = document.getElementsByClassName('mlfqPIDCr');
    const pidrs = document.querySelectorAll ('.mlfqPIDr');
    const atrs = document.querySelectorAll('.mlfqA_Tr');
    const btrs = document.querySelectorAll('.mlfqB_Tr');
    const rtrs = document.querySelectorAll('.mlfqR_Tr');
    const wtrs = document.querySelectorAll('.mlfqW_Tr');
    const tatrs = document.querySelectorAll('.mlfqTA_Tr');
    const prrs = document.querySelectorAll('.mlfqPR_r');

    currTime[0].value = currentTime;
    currPid[0].value = currentProcess.pid;

    for(let i = 0; i < processes.length; i++) {
        pidrs[i].value = processes[i].pid;
        atrs[i].value = processes[i].arrivalTime;
        btrs[i].value = processes[i].burstTime;
        rtrs[i].value = processes[i].remainingTime;
        wtrs[i].value = processes[i].waitTime;
        tatrs[i].value = processes[i].turnaroundTime;
        prrs[i].value = processes[i].priority;
    }
}