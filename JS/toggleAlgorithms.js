function MA(opcion) {
    // Obtener todas las opciones de la lista
    var opciones = document.getElementsByClassName("dropdown-item");
  
    // Recorrer las opciones y ocultar el contenido de todas menos la seleccionada
    for (var i = 0; i < opciones.length; i++) {
      var contenido = document.getElementById(opciones[i].getAttribute("data-opcion"));
      if (opciones[i].getAttribute("data-opcion") === opcion) {
        contenido.style.display = "block";
      } else {
        contenido.style.display = "none";
      }
    }
  }