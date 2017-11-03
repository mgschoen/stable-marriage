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

module.exports = IDFactory;