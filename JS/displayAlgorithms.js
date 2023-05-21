//Referencias a los archivos de los Algoritmos Scheduling
const FCFSElement = document.getElementById('FCFS');
const FIFOElement = document.getElementById('FIFO');
const RRElement = document.getElementById('RR');
const SJFElement = document.getElementById('SJF');
const SRTElement = document.getElementById('SRT');
const HRRNElement = document.getElementById('HRRN');
const MLFQElement = document.getElementById('MLFQ');
fetch('Algs-Sched/FCFS.html').then(response => response.text()).then(html => {FCFSElement.innerHTML = html;});
fetch('Algs-Sched/FIFO.html').then(response => response.text()).then(html => {FIFOElement.innerHTML = html;});
fetch('Algs-Sched/RR.html').then(response => response.text()).then(html => {RRElement.innerHTML = html;});
fetch('Algs-Sched/SJF.html').then(response => response.text()).then(html => {SJFElement.innerHTML = html;});
fetch('Algs-Sched/SRT.html').then(response => response.text()).then(html => {SRTElement.innerHTML = html;});
fetch('Algs-Sched/HRRN.html').then(response => response.text()).then(html => {HRRNElement.innerHTML = html;});
fetch('Algs-Sched/MLFQ.html').then(response => response.text()).then(html => {MLFQElement.innerHTML = html;});