const fs = require('fs');
const http = require('http');
const path = require('path');

const root = __dirname;
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
};

http
  .createServer((request, response) => {
    const requestPath = request.url === '/' ? 'index.html' : decodeURIComponent(request.url.split('?')[0]).replace(/^\//, '');
    const filePath = path.resolve(root, requestPath);

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }

      response.writeHead(200, {
        'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
      });
      response.end(file);
    });
  })
  .listen(8080, '127.0.0.1', () => {
    console.log('Doctor web is running at http://localhost:8080');
  });
