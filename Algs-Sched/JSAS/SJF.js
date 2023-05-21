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
    processes.sort(compararTiempoBurst);
    for (let i = 0; i < processes.length; i++){
        const PIDTSJF = processes[i].pid;
        const htmlBlock = `
        <div class="row" id="results">
            <div class="mb-3 col-2">
                <input disabled readonly class="form-control PIDres" value="${PIDTSJF}">
            </div>
        </div>
        `;
        linea2.innerHTML += htmlBlock;
        await sleep((processes[i].burst_time)*1000);
    }
    stopClock();
    // mostrar que todo ya termino
    var mensajeOculto = document.getElementById("mensaje2");
    mensajeOculto.style.display = "block";
  }