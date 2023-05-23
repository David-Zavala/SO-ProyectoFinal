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

function sortByArrival(a, b)
{
  return a.arrivalTime - b.arrivalTime;
}

async function simulateHRRN(processes){

  // Si el reloj no esta iniciado, iniciarlo
  let clockInput = document.querySelector('.clock');
  let clockValue = clockInput.value;
  if (clockValue == 0) startClock();
  
  // Verificar que el reloj no este detenido
  stopClock();
  startClock();

  // Suma de los bursts
  let sumBurst = 0; let n = processes.length;
  for(i=0; i<n; i++){
    sumBurst += processes[i].burstTime;
  }
  
  // Ciclo del proceso HRRN
  for (currentTime = 0; currentTime < sumBurst;) {
    // Ajustar Response-Rate
    let hrr = -9999;
    let respRatio;


    let nextP;
    for (i = 0; i < n; i++) {
        if (processes[i].arrivalTime <= currentTime && processes[i].completed != 1) {
            displayResult(processes, currentTime, processes[i].pid);

            // Calculamos Response-Ratio
            respRatio = (processes[i].burstTime + (currentTime - processes[i].arrivalTime)) / processes[i].burstTime;

            // Checamos el highest response-ratio
            if (hrr < respRatio) {
                // Storing Response Ratio
                hrr = respRatio;
                nextP = i; // Siguiente proceso
            }
        }
    }
    
    
    // Actualizar timer y esperar el tiempo de burst del proceso
    for(j=0; j<processes[nextP].burstTime; j++){
        // Manejador de Interrupciones
      const message = document.querySelector(".messagesHRRN");
      let inter = document.querySelector('.interrupt').value;
      if (inter > 0){
          switch (inter){
              case '1':
                message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[nextP].pid}, a través de SVC I/O">`;
                break;
              case '2':
                message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[nextP].pid}, a traves de SVC Normal">`;
                break;
              case '3':
                message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[nextP].pid}, a traves de un error del programa">`;
                break;
              case '4':
                message.innerHTML += `<input disabled readonly class="form-control" value="El proceso: ${processes[nextP].pid}, se ha convertido en un proceso Zoombie">`;
                break;
              case '5':
                message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[nextP].pid} abruptamente">`;
                break;
          }
          document.querySelector('.interrupt').value = 0;
          currentTime++;
          await sleep(1000);
      } else {
        await sleep(1000);
        processes[nextP].remainingTime--;
        currentTime++;
        displayResult(processes, currentTime, processes[nextP].pid);
      }
    }

    // Actualizar variables
    processes[nextP].waitTime = currentTime - processes[nextP].arrivalTime - processes[nextP].burstTime;
    processes[nextP].turnaroundTime = currentTime - processes[nextP].arrivalTime;
    processes[nextP].completed = 1;
    processes[nextP].completionTime = currentTime;

    displayResult(processes, currentTime, processes[nextP].pid);
  }

  stopClock();
}

async function ejecutarHRRN(){
  const n = document.getElementsByClassName("PIDhrrn").length;
  let processes = [];

  for (let i = 0; i < n; i++) {
      let burstTime = parseInt(document.getElementsByClassName("B_Thrrn")[i].value);
      let arrivalTime = parseInt(document.getElementsByClassName("A_Thrrn")[i].value);

      if (isNaN(burstTime) || isNaN(arrivalTime)) {
          continue;
      }
      processes.push(new Process(i + 1, arrivalTime, burstTime, 0));
    }
    processes.sort(sortByArrival);

    await simulateHRRN(processes);
}

async function displayResult(processes) {
  const pidrs = document.querySelectorAll ('.hrrnPIDr');
  const atrs = document.querySelectorAll('.hrrnA_Tr');
  const btrs = document.querySelectorAll('.hrrnB_Tr');
  const rtrs = document.querySelectorAll('.hrrnR_Tr');
  const wtrs = document.querySelectorAll('.hrrnW_Tr');
  const tatrs = document.querySelectorAll('.hrrnTA_Tr');
  const currPid = document.getElementsByClassName('hrrnPIDcr');

  for(let i = 0; i < processes.length; i++) {
      pidrs[i].value = processes[i].pid;
      atrs[i].value = processes[i].arrivalTime;
      btrs[i].value = processes[i].burstTime;
      rtrs[i].value = processes[i].remainingTime;
      wtrs[i].value = processes[i].waitTime;
      tatrs[i].value = processes[i].turnaroundTime;
  }
}