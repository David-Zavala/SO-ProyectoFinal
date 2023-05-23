function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Process {
  constructor(pid, arrivalTime, burstTime, completed) {
      this.pid = pid;
      this.arrivalTime = arrivalTime;
      this.burstTime = burstTime;
      this.remainingTime = burstTime;
      this.waitTime = 0;
      this.turnaroundTime = 0;
      this.completionTime = 0;
      this.completed = 0;
  }
}

function sortByArrival(a, b){
  return a.arrivalTime - b.arrivalTime;
}
function sortByBurstTime(a, b) {
  return a.burstTime - b.burstTime;
}

async function simulateSRT(processes){
  // Si el reloj no esta iniciado, iniciarlo
  let clockInput = document.querySelector('.clock');
  let clockValue = clockInput.value;
  if (clockValue == 0) startClock();
  
  // Verificar que el reloj no este detenido
  stopClock();
  startClock();
  
  // Variables de manejo
  let currentTime = 0;
  let completedProcesses = 0;
  let readyQueue = [];
  let processIndex = 0;

  // Ciclo de scheduling SRT
  while (completedProcesses < processes.length) {
      // Agregamos todos los procesos listos a la cola
      for (let process of processes) {
            if (process.arrivalTime <= currentTime && process.remainingTime > 0) {
                if (!readyQueue.includes(process)) {
                    readyQueue.push(process);
                }
            }
      }
      

        // Acomodamos el proceso que tenga menos tiempo restante
        readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);

        // Manejador de Interrupciones
        const message = document.querySelector(".messagesSRT");
        let inter = document.querySelector('.interrupt').value;
        // Corremos el proceso
        let currentProcess = readyQueue[0];
        if (inter > 0){
            switch (inter){
                case '1':
                  message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${currentProcess.pid}, a través de SVC I/O">`;
                  break;
                case '2':
                  message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${currentProcess.pid}, a traves de SVC Normal">`;
                  break;
                case '3':
                  message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${currentProcess.pid}, a traves de un error del programa">`;
                  break;
                case '4':
                  message.innerHTML += `<input disabled readonly class="form-control" value="El proceso: ${currentProcess.pid}, se ha convertido en un proceso Zoombie">`;
                  break;
                case '5':
                  message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${currentProcess.pid} abruptamente">`;
                  break;
            }
            document.querySelector('.interrupt').value = 0;
            currentTime++;
            currentProcess.remainingTime++;
            await sleep(1000);
        } else {
          currentProcess.remainingTime--;
          currentTime++;
          await sleep(1000);
        }
        
        
        // Checamos si se completo el proceso
        if (currentProcess.remainingTime === 0) {
            readyQueue.shift();
            completedProcesses++;
            currentProcess.waitTime = currentTime - currentProcess.arrivalTime - currentProcess.burstTime;
            currentProcess.turnaroundTime = currentTime - currentProcess.arrivalTime;
            displayResult(currentProcess, completedProcesses-1);
        }
        
    }

  stopClock();
}

async function ejecutarSRT(){
  const n = document.getElementsByClassName("PIDsrt").length;
  let processes = [];

  for (let i = 0; i < n; i++) {
      let burstTime = parseInt(document.getElementsByClassName("B_Tsrt")[i].value);
      let arrivalTime = parseInt(document.getElementsByClassName("A_Tsrt")[i].value);

      if (isNaN(burstTime) || isNaN(arrivalTime)) {
          continue;
      }
      processes.push(new Process(i + 1, arrivalTime, burstTime, 0));
    }
    processes.sort(sortByArrival);

    await simulateSRT(processes);
}

async function displayResult(currentProcess, completedProcesses) {
  const pidrs = document.querySelectorAll ('.srtPIDr');
  const atrs = document.querySelectorAll('.srtA_Tr');
  const btrs = document.querySelectorAll('.srtB_Tr');
  const rtrs = document.querySelectorAll('.srtR_Tr');
  const wtrs = document.querySelectorAll('.srtW_Tr');
  const tatrs = document.querySelectorAll('.srtTA_Tr');

  pidrs[completedProcesses].value = currentProcess.pid;
  atrs[completedProcesses].value = currentProcess.arrivalTime;
  btrs[completedProcesses].value = currentProcess.burstTime;
  rtrs[completedProcesses].value = currentProcess.remainingTime;
  wtrs[completedProcesses].value = currentProcess.waitTime;
  tatrs[completedProcesses].value = currentProcess.turnaroundTime;
}