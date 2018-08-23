const http = require('http')
const path = require('path')
const chalk = require('chalk') //变色
// supervisor app.js 监听自动刷新
const conf = require('./config/defaultConfig')

const route = require('./helper/route')

const server = http.createServer((req, res) => {
	const filePath = path.join(conf.root, req.url);
    route(req, res ,filePath)

	// fs.stat(filePath, (err, status) => {
	// 	if(err) {
	// 		res.statusCode = 404;
	// 		res.setHeader('Content-type', 'text/plain')
	// 		res.end(`${filePath} is not a directly or `)
	// 		return;
	// 	}
	// 	if(status.isFile()) {
	// 		res.statusCode = 200;
	// 		res.setHeader('Content-type', 'text/plain')
	// 		fs.createReadStream(filePath).pipe(res);
	// 	}else if(status.isDirectory()){
	// 		fs.readdir(filePath,(err,files) =>{
	// 			res.statusCode = 200;
	// 			res.setHeader('Content-type', 'text/plain')
	// 			res.end(files.join(''))
	// 		})
	// 	}
	// })
});

server.listen(conf.port, conf.hostname, () => {
	const addr = `http://${conf.hostname}:${conf.port}`
	console.log(`addr ${chalk.green(addr)}`)
})
