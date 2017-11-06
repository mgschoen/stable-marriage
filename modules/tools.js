class IDFactory {

    constructor () {
        this.count = 0;
    }

    createID () {
        let id = this.count;
        this.count += 1;
        return id;
    }
}

const indentify = (string, digits = 3) => {
    let diff = digits - (string + '').length;
    var indentation = '';
    while (diff > 0) {
        indentation += ' ';
        diff--;
    }
    return indentation + string;
};

const shuffledArray = (orig) => {
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
};

module.exports = {
    IDFactory: IDFactory,
    indentify: indentify,
    shuffledArray: shuffledArray
};