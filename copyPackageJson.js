const fs = require('fs');

fs.copyFileSync('./package.json', './dist/package.json', fs.constants.COPYFILE_FICLONE)
