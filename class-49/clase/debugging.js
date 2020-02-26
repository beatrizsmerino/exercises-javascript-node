// Debugging with node
// TERMINAL -> node --inspect script.js



const assert = require('assert'); // extenal

assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
assert.deepStrictEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);


function add(a, b) {
    return a + b;
}

var expected = add(1, 2);
assert(expected === 3, 'one plus two is three');
assert.notEqual(expected, 3, 'one plus two is three (NOT FOUR!)')