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

module.exports = {
    IDFactory: IDFactory,
    indentify: indentify
};