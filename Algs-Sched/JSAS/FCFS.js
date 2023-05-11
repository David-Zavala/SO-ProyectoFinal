function ejecutar() {
  const pidrs = document.querySelectorAll('.PIDr');
  pidrs[0].value = 120;
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
function schedule_fcfs(processes) {
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
  // Imprimir resultados
  for (let i = 0; i < processes.length; i++) {
    const proc = processes[i];
    pidrs[i].value = proc.pid;
    atrs[i].value = proc.arrival_time;
    wtrs[i].value = proc.waiting_time;
    ctrs[i].value = completion_time[i];
    ttrs[i].value = turnaround_time[i];
    wwtrs[i].value = waiting_time[i];
  }
  trp.value = (total_turnaround_time / processes.length);
  tep.value = (total_waiting_time / processes.length);
}