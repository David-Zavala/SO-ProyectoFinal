function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ejecutarSJF() {
    //  Obtener todos los PID
    const inputs = document.querySelectorAll(".PIDsjf");

    const processes = [];
    // Checar cuales campos de los PID estan vacios para no agregarlos
    for (let i = 0; i < inputs.length; i++) {
      // Se toman todos los valores que concuerden con el PID
      const pid = inputs[i].value;
      const a_t = document.querySelectorAll(".A_Tsjf")[i].value;
      const b_t = document.querySelectorAll(".B_Tsjf")[i].value;
      // Si esta no esta vacio se crea un proceso con sus atributos
      if (pid !== "") {
        const process = {
          pid: parseInt(pid),
          arrival_time: parseInt(a_t),
          burst_time: parseInt(b_t),
        };
        // crear objeto proceso

        // Y se agrega al arreglo de procesos
        processes.push(process);
      }
    }

    //Ejcucion del algoritmo principal
    schedule_SJF(processes);
}
  async function schedule_SJF(processes) {

    const linea2 = document.querySelector(".totalresults2");
    const mesagesSJF = document.querySelector(".messagesSJF");
      
    //Funcion para ordenar dependiendo de su burst_time
    function compararTiempoBurst(a, b) {
        var proceso_a = a;
        var proceso_b = b;
        return proceso_a.burst_time - proceso_b.burst_time;
    }

    // Si el reloj no ha empezado, iniciarlo
    let clockInput = document.querySelector('.clock');
    let clockValue = clockInput.value;
    if (clockValue == 0)startClock();
    //Para asegurar que el reloj este corriendo al momento de ejecutar los procesos
    stopClock();
    startClock();

    // proceso SJF se ordenar por su burst_time con funcion para ordenar
    var flag = false;
    processes.sort(compararTiempoBurst);
    for (let i = 0; i < processes.length; i++){
      for (let s = 0; s < processes[i].burst_time; s++){
        let inter = document.querySelector('.interrupt').value
        if (inter > 0){
            switch (inter){
                case '1':
                  mesagesSJF.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[i].pid}, a través de SVC I/O">`;
                  break;
                case '2':
                  mesagesSJF.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[i].pid}, a traves de SVC Normal">`;
                  break;
                case '3':
                  mesagesSJF.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[i].pid}, a traves de un error del programa">`;
                  break;
                case '4':
                  mesagesSJF.innerHTML += `<input disabled readonly class="form-control" value="El proceso: ${processes[i].pid}, se ha convertido en un proceso Zoombie">`;
                  break;
                case '5':
                  mesagesSJF.innerHTML += `<input disabled readonly class="form-control" value="Se ha interrumpido el proceso: ${processes[i].pid} abruptamente">`;
                  break;
            }
            flag =true;
            s = processes[i].burst_time + 1;
            document.querySelector('.interrupt').value = 0;
            await sleep(1000);
        }
        else
          await sleep(1000);
      }
      if(!flag){
        const PIDTSJF = processes[i].pid;
        const htmlBlock = `
        <div class="row" id="results">
          <div class="mb-3 col-2">
            <input disabled readonly class="form-control PIDres" value="${PIDTSJF}">
          </div>
        </div>
        `;
        linea2.innerHTML += htmlBlock;
      }
      flag = false;
    }
    stopClock();
    // mostrar que todo ya termino
    var mensajeOculto = document.getElementById("mensaje2");
    mensajeOculto.style.display = "block";
  }