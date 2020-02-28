const fs = require('fs');

fs.readFile('./files/file-read.txt', 'utf8', { flag: "a" }, (err, data) => {
    if (!err) {
        console.log(data);
    } else {
        throw err;
    }
});