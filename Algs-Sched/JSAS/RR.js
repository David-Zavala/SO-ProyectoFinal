function ejecutarRR() {

    //  Obtener todos los PID
    const inputs = document.querySelectorAll(".PIDRR");
    // Obtener el Quantum
    const quantum = document.querySelector(".Qrrr");
    valorQuantum = parseInt(quantum.value);
    const processes = [];
    // Checar cuales campos de los PID estan vacios para no agregarlos
    for (let i = 0; i < inputs.length; i++) {
      // Se toman todos los valores que concuerden con el PID
      const pid = inputs[i].value;
      const p_t = document.querySelectorAll(".P_T")[i].value;
      // Si esta no esta vacio se crea un proceso con sus atributos
      if (pid !== "") {
        const process = {
          pid: parseInt(pid),
          process_time: parseInt(p_t),
        };
        // crear objeto proceso

        // Y se agrega al arreglo de procesos
        processes.push(process);
      }
    }
    //Ejcucion del algoritmo principal
    schedule_RR(processes, valorQuantum);
}
  function schedule_RR(processes, quantum) {
  
    // agregar html con los resultados
    const linea = document.querySelector(".totalresults");
    let total_time = 0;
    let current_time = 0;
    for (let i = 0; i < processes.length; i++) {
        total_time += processes[i].process_time;
    }

    // proceso RR
    while(total_time > 0){
        for (let i = 0; i < processes.length; i++) {
            if (processes[i].process_time > 0){
                const PIDT = processes[i].pid;
                const total_timeT = total_time;
                const current_timeT = current_time;
                const htmlBlock = `
                <div class="row" id="results">
                    <div class="mb-3 col-2">
                        <input disabled readonly class="form-control PIDres" value="${PIDT}">
                    </div>
                    <div class="mb-3 col-2">
                        <input   disabled readonly class="form-control T_Tres" value="${total_timeT}">
                    </div>
                    <div class="mb-3 col-2">
                        <input   disabled readonly class="form-control C_Tres" value="${current_timeT}">
                    </div>
                    <div class="mb-3 col-2">
                        <input   disabled readonly class="form-control Q_Tres" value="${quantum}">
                    </div>
                </div>
                `;
                linea.innerHTML += htmlBlock;
                if (processes[i].process_time <= quantum){
                    current_time += processes[i].process_time;
                    total_time -= processes[i].process_time;
                    processes[i].process_time = 0;
                }
                else{
                    current_time += quantum;
                    total_time -= quantum;
                    processes[i].process_time;
                }
            }
        }
    }
    // mostrar que todo ya termino
    var mensajeOculto = document.getElementById("mensaje");
    mensajeOculto.style.display = "block";
  }