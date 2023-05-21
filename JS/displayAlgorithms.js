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
//Referencias a los archivos de los Algoritmos Paginacion
const FIFOapElement = document.getElementById('FIFOap');
const LRUapElement = document.getElementById('LRUap');
const LFUapElement = document.getElementById('LFUap');
const NRUapElement = document.getElementById('NRUap');
const RPOapElement = document.getElementById('RPOap');
fetch('Algs-Pag/FIFOap.html').then(response => response.text()).then(html => {FIFOapElement.innerHTML = html;});
fetch('Algs-Pag/LRUap.html').then(response => response.text()).then(html => {LRUapElement.innerHTML = html;});
fetch('Algs-Pag/LFUap.html').then(response => response.text()).then(html => {LFUapElement.innerHTML = html;});
fetch('Algs-Pag/NRUap.html').then(response => response.text()).then(html => {NRUapElement.innerHTML = html;});
fetch('Algs-Pag/RPOap.html').then(response => response.text()).then(html => {RPOapElement.innerHTML = html;});