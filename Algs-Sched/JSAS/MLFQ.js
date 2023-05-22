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
async function simulateMLFQ(processes, numQueues, timeQuantum, agingTime) {
    
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
    console.log(processes);

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

            displayResult(processes);

            // Obtener proceso
            let currentProcess = queues[i].shift();
            console.log(`Queue ${i+1}: Entered process [${currentProcess.pid}]`);
        
            // Calcular tiempo de respuesta del proceso
            if(currentProcess.remainingTime === currentProcess.burstTime) {
                currentProcess.responseTime = currentTime - currentProcess.arrivalTime;
                totalResponseTime += currentProcess.responseTime;
            }

            // Ejecutar hasta el quantum o hasta que se termine
            let executionTime = Math.min(timeQuantum[i], currentProcess.remainingTime);
            await sleep(executionTime * 1000);
            currentTime += executionTime;
            currentProcess.remainingTime -= executionTime;

            // Agregar los procesos aun no completados a la cola y asignarles nueva prioridad
            if(currentProcess.remainingTime > 0) {
                if(i < numQueues - 1 && currentProcess.waitTime >= agingTime[i]) {
                    currentProcess.priority++;
                    currentProcess.waitTime = 0;
                    currentProcess.queueLevel++;
                    displayResult(processes);
                }
                queues[currentProcess.queueLevel].push(currentProcess);
            } else {
                // Calcula nuevos tiempos de espera y de turnaround
                currentProcess.waitTime = currentTime - currentProcess.arrivalTime - currentProcess.burstTime;
                currentProcess.turnaroundTime = currentTime - currentProcess.arrivalTime;
                totalWaitTime += currentProcess.waitTime;
                totalTurnaroundTime += currentProcess.turnaroundTime;
                completedProcesses++;
                displayResult(processes);
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
    displayResult(processes);
    stopClock();
}


async function ejecutarMLFQ() {
    const numQueues = 3;
    const timeQuantum = [4, 6, 10];
    const agingTime = [10, 20, 30]; 

    const n = document.getElementsByClassName("PIDMLFQ").length;
    let processes = [];

    for (let i = 0; i < n; i++) {
        let burstTime = parseInt(document.getElementsByClassName("B_T")[i].value);
        let arrivalTime = parseInt(document.getElementsByClassName("A_T")[i].value);
        let priority = parseInt(document.getElementsByClassName("P")[i].value);

        if (isNaN(burstTime) || isNaN(arrivalTime) || isNaN(priority)) {
            continue;
        }

        processes.push(new Process(i + 1, arrivalTime, burstTime, priority));
    }
    processes.sort(sortByPriority);

    await simulateMLFQ(processes, numQueues, timeQuantum, agingTime);
    document.getElementById("mensaje").style.display = "block";
}


function displayResult(processes) {
    let results = document.querySelectorAll('#results');
    for(let i = 0; i < processes.length; i++) {
        let process = processes[i];
        let resultRow = results[i];

        resultRow.querySelector('.PIDr').value = process.pid;
        resultRow.querySelector('.A_Tr').value = process.arrivalTime;
        resultRow.querySelector('.B_Tr').value = process.burstTime;
        resultRow.querySelector('.R_Tr').value = process.remainingTime;
        resultRow.querySelector('.W_Tr').value = process.waitTime;
        resultRow.querySelector('.TA_Tr').value = process.turnaroundTime;
        resultRow.querySelector('.RES_Tr').value = process.responseTime;
        resultRow.querySelector('.PR_r').value = process.priority;
    }

    let totalTurnaroundTime = processes.reduce((total, process) => total + process.turnaroundTime, 0);
    let totalWaitTime = processes.reduce((total, process) => total + process.waitTime, 0);

    document.querySelector('.TR_P').value = totalTurnaroundTime / processes.length;
    document.querySelector('.TE_P').value = totalWaitTime / processes.length;
}