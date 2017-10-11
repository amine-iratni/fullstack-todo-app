const path = require('path');
const config = require('./node_modules/@ionic/app-scripts/config/webpack.config');

config.resolve.modules = [path.resolve(__dirname, '../node_modules'), './node_modules'] ;       
// config.resolveLoader.modules = [path.resolve(__dirname, '../node_modules'), './node_modules' ];

module.exports = function (options) {
    return config;
};