const StableMarriageProblem = require('./classes/stable-marriage-problem.js');

let smp = new StableMarriageProblem();
smp.match();
console.log('\n\n\n');
console.log('* * * * * * * * * * * * * * * * * * *');
console.log('* * * *   Matching Overview   * * * *');
console.log('* * * * * * * * * * * * * * * * * * *\n');
console.log(smp.printPriorityTable());