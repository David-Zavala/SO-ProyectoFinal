function interrupt (typeinter){
    switch (typeinter){
        case 'SVCIO':
            document.querySelector('.interrupt').value = 1;
            break;
        case 'SVCN':
            document.querySelector('.interrupt').value = 2;
            break;
        case 'EP':
            document.querySelector('.interrupt').value = 3;
            break;
        case 'Z':
            document.querySelector('.interrupt').value = 4;
            break;
        case 'A9':
            document.querySelector('.interrupt').value = 5;
            break;
        case 'QE':
            document.querySelector('.interrupt').value = 6;
            break;
    }
}
// Valores de Value y sus significado
// 0 = No interrupciones
// 1 = SVC I/O
// 2 = SVC Normal
// 3 = Error de programa
// 4 = Zoombie
// 5 = Abrupto -9
// 6 = Quantum Expired