const StableMarriageProblem = require('./classes/stable-marriage-problem.js');

let smp = new StableMarriageProblem();
smp.match();
console.log(smp.printPriorityTable());