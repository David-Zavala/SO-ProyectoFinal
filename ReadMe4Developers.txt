Lo que van a modificar de los algoritmos esta en las carpetas:
- Algs-Sched (Algoritmos de Scheduling)
- Algs-Pag (Algoritmos de Paginacion)

En el html correspondiente ponen como se va a desplegar, se pueden basar de los que ya esten hechos para esa interfaz

Dentro de cada carpeta estan los JavaScript's correspondientes
- Algs-Sched (Algoritmos de Scheduling)
    - JSAS (JavaScript Algoritmos Scheduling)
- Algs-Pag (Algoritmos de Paginacion)
    - JSAP (JavaScript Algoritmos Paginacion)

Dentro de los JavaScript's es donde se pondra la logica del algoritmo, igual también se pueden basar de otro que ya este hecho para darse una idea

************
Para probar los algoritmos pueden activar una vista previa del html y en ese mismo html poner esta linea:
    <script src="nombredelarchivo.js"></script>
Para que no tengan que estar seleccionando el algoritmo en la pagina inicial cada vez que hagan cambios

E igual al inicio, estas linea:
    <!-- JS Bootstrap 5.3 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    <!-- CSS Bootstrap 5.3 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <!-- Iconos de Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
Para que cargue bootstrap y no se vea mal
************

Para la vista previa les recomiendo descargar este plugin:
- Live Preview
Con este nada mas, cuando esten en el html, aparecera como un cuadro dividido en dos con una lupa hasta arriba a la derecha, ahí le pican.

De ahí en fuera lo demás debería estar funcionando bien, si encuentran un error lo arreglan si pueden o me avisan para corregirlo.
Cualquier duda con el codigo que ya esta también me pueden preguntar.

IMPORTANTE, EL NOMBRE DE LAS CLASES PARA AGARRAR LOS DATOS DESDE EL JAVASCRIPT, DEBEN SER DIFERENTES POR ALGORITMO PARA QUE NO HAYA
PROBLEMAS A LA HORA DE EJECUTAR LOS JAVASCRIPT's
LO ANTERIOR TAMBIÉN APLICA PARA EL NOMBRE DE LAS FUNCIONES QUE HAGAN EN JAVASCRIPT