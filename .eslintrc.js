module.exports = {
    "ecmaFeatures": { modules: true },
    "rules": {
        "indent": [
            2,
            2
        ],
        "quotes": [
            2,
            "single"
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "semi": [
            2,
            "always"
        ]
    },
    "env": {
        "es6": true,
        "mocha": "true",
        "node": "true"
    },
    "extends": "eslint:recommended"
};