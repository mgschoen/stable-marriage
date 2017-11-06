const tools = require('./tools.js');

const IDFactory = new tools.IDFactory();

class Generator {

    static randomStandardSMP (n = 20) {
        var SMPJson= {
            'men': {},
            'women': {}
        };

        // Create entries for men and women
        var c = 0,
            maleIDs = [],
            femaleIDs = [];
        while (c<n) {
            let mid = IDFactory.createID();
            let wid = IDFactory.createID();
            SMPJson.men[mid] = [];
            SMPJson.women[wid] = [];
            maleIDs[maleIDs.length] = mid;
            femaleIDs[femaleIDs.length] = wid;
            c++;
        }

        // Create priority lists
        for (let k in SMPJson.men) {
            SMPJson.men[k] = tools.shuffledArray(femaleIDs);
        }
        for (let k in SMPJson.women) {
            SMPJson.women[k] = tools.shuffledArray(maleIDs);
        }

        return SMPJson;
    }

}

module.exports = Generator;