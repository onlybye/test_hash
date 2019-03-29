'use strict';

let path = require('path');
/**
 * Helper functions.
 */
let ROOT = path.resolve(__dirname, '..');
let root = path.join.bind(path, ROOT);

module.exports = {
    root: root
}
