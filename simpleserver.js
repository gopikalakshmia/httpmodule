let http=require("http");

let server=http.createServer((request,response)=>{
    //http://localhost:9090/ when request come through the url,the method will get called
 response.end("welcome to simple http module");
})

server.listen(9090,()=>console.log("server listening"));