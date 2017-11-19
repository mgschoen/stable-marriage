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

    constructor (config) {

        if (typeof config !== 'object') {
            throw new Error('StableMarriageProblem can only be instantiated with a config object'); }
        if (!config.hasOwnProperty('men') || !config.hasOwnProperty('women')) {
            throw new Error('Config object must have properties "men" and "women" specified'); }
        if (!config.men instanceof Object || !config.women instanceof Object ||
            Array.isArray(config.men) || Array.isArray(config.women)) {
            throw new Error('Config object\'s properties "men" and "women" must be key-value paired Objects'); }
        // The following check can be omitted as soon as different sized sets are supported
        if (Object.keys(config.men).length !== Object.keys(config.women).length) {
            throw new Error('Men and women sets need to be of the same size'); }

        this.n = Object.keys(config.men).length;
        this.men = [];
        this.women = [];

        let configMenKeys = Object.keys(config.men);
        let configWomenKeys = Object.keys(config.women);

        let keyMapping = {};

        // Create persons and establish a mapping between config keys and internal IDs
        for (let g in config) {
            if (g === 'men' || g === 'women') {
                for (let k in config[g]) {
                    let person = new Person(g);
                    if (keyMapping.hasOwnProperty(k)) {
                        throw new Error('Could not create Person with key "' + k + '": Key already exists'); }
                    keyMapping[k] = person.id;
                    if (g === 'men') {
                        this.men[this.men.length] = person; }
                    else {
                        this.women[this.women.length] = person; }
                }
            }
        }

        // Map priority lists from config to internal priority lists
        for (let g in config) {
            if (g === 'men' || g === 'women') {
                for (let k in config[g]) {
                    if (!Array.isArray(config[g][k])) {
                        throw new Error('Could not create priority list for ' +
                            ((g === 'men') ? 'man' : 'woman') + ' "' + k + '": Priority list configuration must ' +
                            'be an Array'); }
                    if (config[g][k].length != this.n) {
                        throw new Error('Could not create priority list for ' +
                            ((g === 'men') ? 'man' : 'woman') + ' "' + k + '": Priority lists must be of ' +
                            'same size as the whole instance (n=' + this.n + ')');}

                    let person = this.getPersonByID(new Gender(g), keyMapping[k]);
                    person.setPriorityList(config[g][k].map(v => {
                        if (!keyMapping.hasOwnProperty(v)) {
                            throw new Error('Could not create priority list for ' +
                                ((g === 'men') ? 'man' : 'woman') + ' "' + k + '": Unknown key "' + v + '"'); }
                        let knownKeysForOppositeGender = (g === 'men') ? configWomenKeys : configMenKeys;
                        if (knownKeysForOppositeGender.indexOf(v + '') < 0) {
                            throw new Error('Could not create priority list for ' +
                                ((g === 'men') ? 'man' : 'woman') + ' "' + k + '": Key "' + v + '" is invalid '+
                                '(priority lists may only contain persons of opposite sex)'); }

                        return keyMapping[v];
                    }));
                }
            }
        }
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