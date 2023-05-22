function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function ejecutar() {
  const set0pidrs = document.querySelectorAll('.PIDr');
  const set0atrs = document.querySelectorAll('.A_Tr');
  const set0wtrs = document.querySelectorAll('.W_Tr');
  const set0ctrs = document.querySelectorAll('.C_Tr');
  const set0ttrs = document.querySelectorAll('.T_Tr');
  const set0wwtrs = document.querySelectorAll('.Ww_Tr');
  
  const set0trp = document.querySelector('.TR_P');
  const set0tep = document.querySelector('.TE_P');

  set0pidrs.forEach(element => {
    element.value = "";
  });
  set0atrs.forEach(element => {
    element.value = "";
  });
  set0wtrs.forEach(element => {
    element.value = "";
  });
  set0ctrs.forEach(element => {
    element.value = "";
  });
  set0ttrs.forEach(element => {
    element.value = "";
  });
  set0wwtrs.forEach(element => {
    element.value = "";
  });
  set0trp.value = "";
  set0tep.value = ""

  //  Obtener todos los PID
  const inputs = document.querySelectorAll(".PID");
  const processes = [];
  // Checar cuales campos de los PID estan vacios para no agregarlos
  for (let i = 0; i < inputs.length; i++) {
    // Se toman todos los valores que concuerden con el PID
    const pid = inputs[i].value;
    const a_t = document.querySelectorAll(".A_T")[i].value;
    const w_t = document.querySelectorAll(".W_T")[i].value;
    // Si esta no esta vacio se crea un proceso con sus atributos
    if (pid !== "") {
      const process = {
        pid: parseInt(pid),
        arrival_time: parseInt(a_t),
        waiting_time: parseInt(w_t),
      };
      // Y se agrega al arreglo de procesos
      processes.push(process);
    }
  }
  //Eejcucion del algoritmo principal
  schedule_fcfs(processes);
}
async function schedule_fcfs(processes) {
  let current_time = 0;
  const completion_time = [];
  const turnaround_time = [];
  const waiting_time = [];
  let total_turnaround_time = 0;
  let total_waiting_time = 0;
  
  // Ordenar los procesos por tiempo de llegada
  processes.sort((a, b) => a.arrival_time - b.arrival_time);
  
  // Calcular tiempos para cada proceso
  for (let i = 0; i < processes.length; i++) {
    const process = processes[i];
    if (current_time < process.arrival_time) {
      current_time = process.arrival_time;
    }
    completion_time[i] = current_time + process.waiting_time;
    turnaround_time[i] = completion_time[i] - process.arrival_time;
    waiting_time[i] = turnaround_time[i] - process.waiting_time;
    current_time = completion_time[i];
    total_turnaround_time += turnaround_time[i];
    total_waiting_time += waiting_time[i];
  }
  // Obtener los campos a los que se les asiganaran los resultados
  const pidrs = document.querySelectorAll('.PIDr');
  const atrs = document.querySelectorAll('.A_Tr');
  const wtrs = document.querySelectorAll('.W_Tr');
  const ctrs = document.querySelectorAll('.C_Tr');
  const ttrs = document.querySelectorAll('.T_Tr');
  const wwtrs = document.querySelectorAll('.Ww_Tr');
  
  const trp = document.querySelector('.TR_P');
  const tep = document.querySelector('.TE_P');

  // Si el reloj no ha empezado, iniciarlo
  let clockInput = document.querySelector('.clock');
  let clockValue = clockInput.value;
  if (clockValue == 0)startClock();
  //Para asegurar que el reloj este corriendo al momento de ejecutar los procesos
  stopClock();
  startClock();
  // Imprimir resultados
  pre_time=0;
  const message = document.querySelector(".messagesFCFS");
  for (let i = 0; i < processes.length; i++) {
    const proc = processes[i];
    pidrs[i].value = proc.pid;
    atrs[i].value = proc.arrival_time;
    wtrs[i].value = proc.waiting_time;
    for (let s = 0; s < completion_time[i]-pre_time; s++){
      let inter = document.querySelector('.interrupt').value
      if (inter > 0){
        switch (inter){
          case '1':
            message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${proc.pid}, a través de SVC I/O">`;
            break;
          case '2':
            message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${proc.pid}, a traves de SVC Normal">`;
            break;
          case '3':
            message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${proc.pid}, a traves de un error del programa">`;
            break;
          case '4':
            message.innerHTML += `<input disabled readonly class="form-control" value="El proceso: ${proc.pid}, se ha convertido en un proceso Zoombie">`;
            break;
          case '5':
            message.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${proc.pid} abruptamente">`;
            break;
        }
        s = completion_time[i]-pre_time + 10;
        await sleep(1000);
      }
      else
        await sleep(1000);
    }
    if (document.querySelector('.interrupt').value == 0)message.innerHTML += `<input disabled readonly class="form-control" value="Proceso: ${proc.pid} COMPLETADO">`;
    pre_time=completion_time[i];
    let clockInput = document.querySelector('.clock');
    let clockValue = clockInput.value;
    ctrs[i].value = clockValue;
    ttrs[i].value = turnaround_time[i];
    wwtrs[i].value = waiting_time[i];
    document.querySelector('.interrupt').value = 0;
  }
  stopClock();
  trp.value = (total_turnaround_time / processes.length);
  tep.value = (total_waiting_time / processes.length);
}