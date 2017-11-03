const colors = require('colors');
const emoji = require('node-emoji');
const Gender = require('./gender.js');
const Person = require('./person.js');
const tools = require('./tools.js');

const emo = {
    pray: emoji.get('pray'),
    grimacing: emoji.get('grimacing'),
    heartEyes: emoji.get('heart_eyes'),
    brokenHeart: emoji.get('broken_heart'),
    cry: emoji.get('cry'),
    ring: emoji.get('ring'),
    blush: emoji.get('blush'),
    sob: emoji.get('sob')
};

class StableMarriageProblem {

    constructor (n = 20) {

        // Create elements
        this.men = [];
        this.women = [];
        var c = 0;
        while (c<n) {
            this.men[this.men.length] = new Person();
            this.women[this.women.length] = new Person('female');
            c++;
        }

        // Create priority lists
        this.men.forEach(v => {
            v.setPriorityList(this.shuffledArray(this.femaleIDs));
        });
        this.women.forEach(v => {
            v.setPriorityList(this.shuffledArray(this.maleIDs));
        });
    }

    get maleIDs () {
        return this.men.map(v => {
            return v.id;
        });
    }

    get femaleIDs () {
        return this.women.map(v => {
            return v.id;
        });
    }

    getPersonByID (gender, id) {
        var list = (gender.value == 'male') ? this.men : this.women;
        var c = 0;
        while (c < list.length) {
            if (list[c].id == id) {
                return list[c];
            }
            c++;
        }
        return null;
    }

    shuffledArray (orig) {
        var shuffle = new Array(orig.length);
        var c = 0;
        while (c<orig.length) {
            var pick = orig[Math.floor(Math.random()*orig.length)];
            if (shuffle.indexOf(pick) < 0) {
                shuffle[c] = pick;
                c++;
            }
        }
        return shuffle;
    }

    printPriorityTable () {
        var string = 'MEN:\n';
        this.men.forEach(v => {
            string += v.printPriorityList() + '\n';
        });
        string += '\nWOMEN:\n';
        this.women.forEach(v => {
            string += v.printPriorityList() + '\n';
        });
        return string;
    }

    existsFreeMan () {
        var result = false, c = 0;
        while (c < this.men.length) {
            if (!this.men[c].engagedWith) {
                result = true;
                break;
            }
            c++;
        }
        return result;
    }

    nextFreeMan (index) {
        var result = null;
        if (!this.men[index].engagedWith) {
            result = index;
        } else {
            var c = (index+1) % this.men.length;
            while (c != index) {
                if (!this.men[c].engagedWith) {
                    result = c;
                    break;
                }
                c = (c+1) % this.men.length;
            }
        }
        return result;
    }

    propose (manId, womanId) {
        let man = this.getPersonByID(new Gender('male'), manId),
            woman = this.getPersonByID(new Gender('female'), womanId);
        console.log(colors.red(tools.indentify('Man ' + manId, 8) + ': ' + emo.pray + '  "Do you love me, woman ' +
            womanId + '?"'));
        var womanString = 'My current husband is number ' +  woman.priorityList.indexOf(woman.engagedWith) +
            ' on my list and you are number ' + woman.priorityList.indexOf(manId) + '.';
        if (woman.engagedWith !== null &&
            woman.priorityList.indexOf(woman.engagedWith) < woman.priorityList.indexOf(manId)) {
            man.nextProposal++;
            console.log(colors.green(tools.indentify('Woman ' + womanId, 8) + ': ' + emo.grimacing +
                '  "I don\'t love you, I\'m sorry. ' + womanString + '"'));
            return false;
        }
        console.log(colors.green(tools.indentify('Woman ' + womanId, 8) + ': ' + emo.heartEyes +
            '  "Yes, I love you! ' + womanString + '"'));
        this.engage(man, woman);
        man.nextProposal++;
        return true;
    }

    engage (man, woman) {
        console.log('');
        // divorce
        if (man.engagedWith !== null) {
            console.log(colors.cyan('  Man ' + man.id + ' ' + emo.brokenHeart + ' ' + emo.cry +
                '  Woman ' + man.engagedWith));
            this.getPersonByID(new Gender('female'), man.engagedWith).engagedWith = null;
        }
        if (woman.engagedWith !== null) {
            console.log(colors.cyan('  Woman ' + woman.id + ' ' + emo.brokenHeart + ' ' + emo.cry +
                '  Man ' + woman.engagedWith));
            this.getPersonByID(new Gender('male'), woman.engagedWith).engagedWith = null;
        }
        //engage
        console.log(colors.cyan('  Man ' + man.id + ' ' + emo.ring + ' ' + emo.blush + '  Woman ' + woman.id));
        man.engagedWith = woman.id;
        woman.engagedWith = man.id;
    }

    match () {
        var c = 0;
        while (this.existsFreeMan()) {
            c = this.nextFreeMan(c);
            let proposer = this.men[c];
            console.log('\n\n\n  Man ' + proposer.id + ' is now looking for a partner...');
            while (proposer.nextProposal < proposer.priorityList.length &&
            !this.propose(proposer.id, proposer.priorityList[proposer.nextProposal])) {
                console.log(tools.indentify('', 3) + emo.sob + ' ' + emo.sob + ' ' + emo.sob + ' ' + emo.sob + ' ' +
                    emo.sob + '\n');
            }
        }
    }
}

module.exports = StableMarriageProblem;