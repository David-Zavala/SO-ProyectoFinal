function mostrar() {
    console.log("Hiciste clic en el botón");
    var divPrueba = document.getElementById("prueba");
    if (divPrueba.style.display === "none") {
      divPrueba.style.display = "block";
    } else {
      divPrueba.style.display = "none";
    }
  }