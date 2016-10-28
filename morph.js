const fs = require('fs');
const path = require('path');

const PATH = {
	source: path.join(__dirname, 'source'),
	result: path.join(__dirname, 'result')
};

const SIZEMAPPING = {
	mdpi: 'x1',
	hdpi: 'x1.5',
	xhdpi: 'x2',
	xxhdpi: 'x3',
	xxxhdpi: 'x4'
}

function iterateInnerFolders(dirPath, todo) {
    fs.readdir(dirPath, null, (err, files) => {
        files.forEach(file => {
            let filePath = path.join(dirPath, file);

            if ( fs.lstatSync(filePath).isDirectory() ) {
                todo(filePath, file);
            }
        });
    })
}

function iterateInnerFiles(dirPath, todo) {
    fs.readdir(dirPath, null, (err, files) => {
        files.forEach(file => {
            let filePath = path.join(dirPath, file);

            if ( !fs.lstatSync(filePath).isDirectory() ) {
                todo(filePath, file);
            }
        });
    })
}

function crDirIfNone(path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
}

function main() {
	
	crDirIfNone(PATH.source);
	crDirIfNone(PATH.result);
	
	iterateInnerFolders(PATH.source, (dirPath, dirName) => {
		dirName = dirName.split('-').slice(-1)[0];
		if ( SIZEMAPPING[dirName] ) {
			let sizeName = SIZEMAPPING[dirName];
			
			iterateInnerFiles(dirPath, (filePath, fileFullName) => {
				let fileNameMap = fileFullName.split('.');
				let fileExt = fileNameMap.slice(-1)[0];
				let fileName = fileNameMap.slice(0, -1).join('.');
				
				crDirIfNone(path.join(PATH.result, fileName));
				
				fs.createReadStream(filePath)
					.pipe(fs.createWriteStream(path.join(PATH.result, fileName, [sizeName, fileExt].join('.') )));
			});
		}
	});
	
}

main();
