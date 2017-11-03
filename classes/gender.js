class Gender {

    constructor (gender = 'm') {
        if (['male', 'female', 'm', 'f'].indexOf(gender) < 0) {
            throw new Error('Invalid gender string in constructor for Gender class. Only \'male\', ' +
                '\'female\', \'m\' and \'f\' allowed.');
        }
        this.gender = (['male', 'm'].indexOf(gender) >= 0) ? 'M' : 'F';
    }

    get value () {
        return (this.gender == 'M') ? 'male' : 'female';
    }
}

module.exports = Gender;