const tools = require('./tools.js');
const Gender = require('./gender.js');

const idFactory = new tools.IDFactory();

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
        return 'Person {id: ' + tools.indentify(this.id) + ', gender: ' + this.gender.value + ', engagedWith: '
            + tools.indentify(this.engagedWith) + '}';
    }

    printPriorityList () {

        if (this.priorityList) {
            var string = tools.indentify(this.id) + ' ' + this.toString() + ': ';
            this.priorityList.forEach((v,i) => {
                string += (i == 0) ? tools.indentify(v) : ', ' + tools.indentify(v);
            });
            return string;
        } else {
            return this.id + ': - no priorities -';
        }
    }
}

module.exports = Person;