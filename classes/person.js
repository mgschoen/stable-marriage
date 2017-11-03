const IDFactory = require('./id-factory.js');
const Gender = require('./gender.js');

const idFactory = new IDFactory();

class Person {

    constructor (gender = 'male') {
        this.id = idFactory.createID();
        this.gender = new Gender(gender);
        this.engagedWith = null;
        this.nextProposal = 0;
    }

    setPriorityList (list) {
        if (!(typeof list == 'object')) {
            throw new Error ('Person.priorityList must be of type array but is: ' + typeof list);
        }
        this.priorityList = list;
    }

    toString () {
        return 'Person {id: ' + this.indentify(this.id) + ', gender: ' + this.gender.value + ', engagedWith: '
            + this.indentify(this.engagedWith) + '}';
    }

    indentify (number) {
        return (number < 10) ? '  ' + number : (number < 100) ? ' ' + number : '' + number;
    }

    printPriorityList () {

        if (this.priorityList) {
            var string = this.indentify(this.id) + ' ' + this.toString() + ': ';
            this.priorityList.forEach((v,i) => {
                string += (i == 0) ? this.indentify(v) : ', ' + this.indentify(v);
            });
            return string;
        } else {
            return this.id + ': - no priorities -';
        }
    }
}

module.exports = Person;