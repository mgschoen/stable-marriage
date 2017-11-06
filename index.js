const StableMarriageProblem = require('./modules/stable-marriage-problem.js');
const Generator = require('./modules/generator.js');

var n = 20;
process.argv.forEach((v, i) => {
    if (v.indexOf('n=') == 0) {
        let parsed = parseInt(v.slice(2));
        if (!isNaN(parsed)) n = parsed;
    }
});

console.log('Generating stable marriage problem of size n=' + n + '...');

let json = Generator.randomStandardSMP(n);
let smp = new StableMarriageProblem(json);
smp.match();
console.log('\n\n\n');
console.log('* * * * * * * * * * * * * * * * * * *');
console.log('* * * *   Matching Overview   * * * *');
console.log('* * * * * * * * * * * * * * * * * * *\n');
console.log(smp.printPriorityTable());