class Process {
  constructor(){
      this.pid = '#';
      this.at = 0;
      this.bt = 0;
      this.ct = 0;
      this.wt = 0;
      this.tt = 0;
      this.completed= 0;
      this.ntt = 0;
  }

}
let p = new Array(10);
for(let i = 0; i < 10; i++){
  p[i] = new Process();
}

let n;

// Sorting Processes by Arrival Time
function sortByArrival()
{
  let temp;
  let i, j;

  // Selection Sort applied
  for (i = 0; i < n - 1; i++) {
      for (j = i + 1; j < n; j++) {

          // Check for lesser arrival time
          if (p[i].at > p[j].at) {

              // Swap earlier Process to front
              temp = p[i];
              p[i] = p[j];
              p[j] = temp;
          }
      }
  }
}


let i, j, sum_bt = 0;
let c;
let t, avgwt = 0, avgtt = 0;
n = 5;

// predefined arrival times
let arriv = [0, 2, 4, 6, 8];

// predefined burst times
let burst = [3, 6, 4, 5, 2];

// Initializing the structure variables
for (i = 0, c = 'A'; i < n; i++) {
  p[i].name = c;
  p[i].at = arriv[i];
  p[i].bt = burst[i];

  // Variable for Completion status
  // Pending = 0
  // Completed = 1
  p[i].completed = 0;

  // Variable for sum of all Burst Times
  sum_bt += p[i].bt;
  c = String.fromCharCode(c.charCodeAt(0) + 1);
}

// Sorting the structure by arrival times
sortByArrival();
console.log("PN\tAT\tBT\tWT\tTAT\tNTT");

for (t = p[0].at; t < sum_bt;) {

  // Set lower limit to response ratio
  let hrr = -9999;

  // Response Ratio Variable
  let temp;

  // Variable to store next Process selected
  let loc;
  for (i = 0; i < n; i++) {

      // Checking if Process has arrived and is
      // Incomplete
      if (p[i].at <= t && p[i].completed != 1) {

          // Calculating Response Ratio
          temp = (p[i].bt + (t - p[i].at)) / p[i].bt;

          // Checking for Highest Response Ratio
          if (hrr < temp) {

              // Storing Response Ratio
              hrr = temp;

              // Storing Location
              loc = i;
          }
      }
  }

  // Updating time value
  t += p[loc].bt;

  // Calculation of waiting time
  p[loc].wt = t - p[loc].at - p[loc].bt;

  // Calculation of Turn Around Time
  p[loc].tt = t - p[loc].at;

  // Sum Turn Around Time for average
  avgtt += p[loc].tt;

  // Calculation of Normalized Turn Around Time
  p[loc].ntt = (p[loc].tt / p[loc].bt);

  // Updating Completion Status
  p[loc].completed = 1;

  // Sum Waiting Time for average
  avgwt += p[loc].wt;
  console.log(p[loc].name + "\t" + p[loc].at + "\t" + p[loc].bt + "\t" + p[loc].wt + "\t" + p[loc].tt + "\t" + p[loc].ntt);
}
console.log("\nAverage waiting time: " + avgwt / n);
console.log("Average Turn Around time:" + avgtt / n);