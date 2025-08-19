// const Logger = require('./logger');

// const logger =new Logger();

// logger.on('message',(data)=>console.log('Called Listener', data));
// logger.log('Hello Word');
// logger.log('hi')


const http=require('http');
const path=require('path');
const fs=require('fs');

const server =http.createServer((req,res)=>{
    //onsole.log(req.url)

    // if(req.url == '/'){
    //     fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>{
    //         if(err) throw err;
    //     res.writeHead(200,{'content-Type':'text/html'})
    //     res.end(content)
    //     })
        
    // }



    // //通常是从数据库中取

    // if(req.url ==='/api/users'){
    //     const users=[
    //         {name:'BOB smith',age:40},
    //         {name:'John Doe',age:30}
    //     ];
    //     res.writeHead(200,{'Content-Type': 'appliication/json'})
    //     res.end(JSON.stringify(users));
    // }



//dynamic

// Build file path

let filePath=path.join(__dirname,'public',req.url==='/'?'index.html':req.url);

//Extension of file

let exname= path.extname(filePath);
//Initial content type

let contentType='text/html';
//check ext and set content type
switch (exname){
    case '.js':
        contentType='text/javascript';
        break;
    case '.css':
        contentType='text/css';
        break;
    case '.json':
        contentType='applicatio/json';
        break;
}

//Read file

fs.readFile(filePath,(err,content)=>{
    if(err){
        if(err.code=='ENOENT'){
            //page not found
            fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.end(content,'utf8');
            })
        }
         else{
        //some server error
        res.writeHead(500);
        res.end(`Server Error:${error.code}`);
    }
    }
    else{
        //success
        res.writeHead(200,{'Content-Type':contentType});
        res.end(content,'utf8')
    }
   
})

});

const PORT=process.env.PORT||5000;

server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));