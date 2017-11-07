const colors = require('colors');
const StableMarriageProblem = require('./modules/stable-marriage-problem.js');
const Generator = require('./modules/generator.js');

try {

    var n = 20,
        path = '';
    process.argv.forEach((v, i) => {
        if (v.indexOf('f=') == 0) {
            path = v.slice(2);
        }
        if (v.indexOf('n=') == 0) {
            let parsed = parseInt(v.slice(2));
            if (!isNaN(parsed)) n = parsed;
        }
    });

    let json = null;
    if (path === '') {
        console.log('Generating stable marriage problem of size n=' + n + '...');
        json = Generator.randomStandardSMP(n);
    } else {
        if (path.indexOf('/') != 0 || path.indexOf('./') != 0) {
            path = './' + path;
        }
        console.log('Reading stable marriage instance from file "' + path + '"...');
        try {
            json = require(path);
        } catch (e) {
            throw new Error('Failed to read file "' + path + '": ' + e.message);
        }
    }


    let smp = new StableMarriageProblem(json);
    smp.match();
    console.log('\n\n\n');
    console.log('* * * * * * * * * * * * * * * * * * *');
    console.log('* * * *   Matching Overview   * * * *');
    console.log('* * * * * * * * * * * * * * * * * * *\n');
    console.log(smp.printPriorityTable());

} catch (e) {
    console.error(colors.bold.red('Error: ' + e.message));
}