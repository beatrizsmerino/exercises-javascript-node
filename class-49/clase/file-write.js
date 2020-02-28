const fs = require('fs');

const data = "y esto... se guardará en el file-write.txt";

// Flags -> https://nodejs.org/api/fs.html#fs_file_system_flags
fs.writeFile('./files/file-write.txt', data, { flag: "w" }, err => {
    if (!err) {
        console.log('Datos guardados en el file-write.txt');
    } else {
        throw err;
    }
});