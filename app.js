import http from 'http';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const PORT = 8080;

const mimeType = {
  '.html' : 'text/html',
  '.css' : 'text/css',
  '.js' : 'application/javascript',
  '.json' : 'application/json',
  '.ico' : 'image/x-icon'
}

const fileUtils = {
  getFilePath : (fileUrl) => {
    if(fileUrl === '/'){
      fileUrl = './public/home.html';
    } else {
      fileUrl = `./public${fileUrl}`;
    }
    return fileUrl;
  },
  getFileExtention : (filePath) => {
    let ext = path.extname(filePath);
    return ext.toLowerCase();
  },
  getFileContent : (ext) => {
    if(mimeType.hasOwnProperty(ext)){
      return mimeType[ext];
    } else {
      return 'text/plain';
    }
  }
}

const server = http.createServer((req, res) => {
  const { method, url } = req;
  let filePath = fileUtils.getFilePath(url);
  let fileExt = fileUtils.getFileExtention(filePath);
  let fileContent = fileUtils.getFileContent(fileExt);
  console.log(filePath, fileExt, fileContent);
  if(method === 'GET'){
    fs.readFile(filePath, (err, data) => {
      if(err){
        if(err.code === 'ENOENT'){
          res.writeHead(404, {'Content-type' : 'text/plain; charset=utf-8'});
          res.end('페이지를 찾을 수 없음');
        } else {
          res.writeHead(500, {'Content-type' : 'text/plain; charset=utf-8'});
          res.end('서버에러');
        }
      } else {
        res.writeHead(200, {'Content-type' : fileContent});
        res.end(data);
      }
    })
  }
})

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})