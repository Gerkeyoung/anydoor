const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
// const readdir = promisify(fs.readdir)
module.exports = async function(req, res, filePath) {
    try {
		const stats = await stat(filePath)
		if(stats.isFile()) {
			res.statusCode = 200;
			res.setHeader('Content-type', 'text/plain')
			fs.createReadStream(filePath).pipe(res);
		}else if(stats.isDirectory()){
			fs.readdir(filePath,(err,files) =>{
				res.statusCode = 200;
				res.setHeader('Content-type', 'text/plain')
				res.end(files.join(''))
			})
		}
	} catch (error) {
		res.statusCode = 404;
		res.setHeader('Content-type', 'text/plain')
		res.end(`${filePath} is not a directly or `)
		return;
	}
}