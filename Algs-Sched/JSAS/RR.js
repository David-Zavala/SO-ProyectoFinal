function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
async  function schedule_RR(processes, quantum) {
  
    // agregar html con los resultados
    const linea = document.querySelector(".totalresults");
    const messageRR = document.querySelector(".messagesRR")
    let total_time = 0;
    let current_time = 0;
    for (let i = 0; i < processes.length; i++) {
        total_time += processes[i].process_time;
    }

    // Si el reloj no esta iniciado, iniciarlo
    let clockInput = document.querySelector('.clock');
    let clockValue = clockInput.value;
    if (clockValue == 0) startClock();
    
    // Verificar que el reloj no este detenido
    stopClock();
    startClock();

    // proceso RR
    while(total_time > 0){
        for (let i = 0; i < processes.length; i++) {
            for (let s = 0; s < quantum; s++){
                let inter = document.querySelector('.interrupt').value
                if (inter > 0){
                    switch (inter){
                        case '1':
                            messageRR.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[i].pid}, a través de SVC I/O">`;
                            break;
                        case '2':
                            messageRR.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[i].pid}, a traves de SVC Normal">`;
                        break;
                        case '3':
                            messageRR.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[i].pid}, a traves de un error del programa">`;
                            break;
                        case '4':
                            messageRR.innerHTML += `<input disabled readonly class="form-control" value="El proceso: ${processes[i].pid}, se ha convertido en un proceso Zoombie">`;
                            break;
                        case '5':
                            messageRR.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[i].pid} abruptamente">`;
                            break;
                        case '6':
                            messageRR.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[i].pid} Quantum Exceded">`;
                            break;
                    }
                    document.querySelector('.interrupt').value = 0;
                    s = quantum + 1;
                    current_time += processes[i].process_time;
                    total_time -= processes[i].process_time;
                    processes[i].process_time = 0;
                    await sleep(1000);
                }
                else
                  await sleep(1000);
            }
            if (processes[i].process_time > 0){
                const PIDT = processes[i].pid;
                const total_timeT = total_time;
                clockInput = document.querySelector('.clock');
                clockValue = clockInput.value;
                if (processes[i].process_time > 4){await sleep(1000);}
                else {await sleep(1000);}
                clockInput = document.querySelector('.clock');
                let FclockValue = clockInput.value;
                const htmlBlock = `
                <div class="row" id="results">
                    <div class="mb-3 col-2">
                        <input disabled readonly class="form-control PIDres" value="${PIDT}">
                    </div>
                    <div class="mb-3 col-2">
                        <input   disabled readonly class="form-control T_Tres" value="${total_timeT}">
                    </div>
                    <div class="mb-3 col-2">
                        <input   disabled readonly class="form-control C_Tres" value="${clockValue}">
                    </div>
                    <div class="mb-3 col-2">
                        <input   disabled readonly class="form-control FE_Tres" value="${FclockValue}">
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
                    processes[i].process_time -= quantum;
                }
            }
        }
    }
    // mostrar que todo ya termino
    var mensajeOculto = document.getElementById("mensaje");
    mensajeOculto.style.display = "block";
    stopClock();
  }