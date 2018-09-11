const path = require('path');

const config = {
    mode: 'development',
    target: 'web',
    entry: './libs/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    }
};

module.exports = config;