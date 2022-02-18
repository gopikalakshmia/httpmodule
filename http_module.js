let http=require("http");
let url=require("url");
let fs=require("fs");
let loginPage = `
                <html>
                <head>
                </head>
                <body>
                <h2>login page<h2>
                <form action="checkuser">
                <label>UserName</label>
                <input type="text" name="user"/><br/>
                <label>Password</label>
                <input type="password" name="pass"/><br/>
                <input type="submit"/>
                <input type="reset"/>
                </form>
                </body>
                </html>`

let indexpage=`<!DOCTYPE html>
                <html lang="en">
                    <head>
                
                    </head>
                    <body>
                        <a href="aboutUs">About</a>
                        <a href="contactUs">Contact</a>
                        <a href="login">Login</a>
                        <a href="signup">New User</a>
                    </body>
                </html>`;

let signup=`<html>
<head>
</head>
<body>
<h2>New User Registration<h2>
<form action="newuser">
<label>UserName</label>
<input type="text" name="user"/><br/>
<label>Email</label>
<input type="text" name="email"/><br/>
<label>Password</label>
<input type="password" name="pass"/><br/>
<input type="submit"/>
<input type="reset"/>
</form>
</body>
</html>`;



let server=http.createServer((req,res)=>{
    let pathinfo=url.parse(req.url,true);
if(pathinfo.pathname!="/favicon.ico"){
    if(pathinfo.pathname=="/")
    {
        res.write(indexpage);
    }

    if(pathinfo.pathname=="/contactUs")
    {
        res.write("Contact us !!! page")
    }
    if(pathinfo.pathname=="/aboutUs")
    {
        res.write("about us !!! page")
    }
    if(pathinfo.pathname=="/login")
    {

        res.write('<h1>welcome</h1>');
    
        res.write(loginPage);
    }
    if(pathinfo.pathname=="/checkuser"){

        let login=pathinfo.query;
        let userslist=JSON.parse(fs.readFileSync("users.json"));
        let userexist=false;
        if(userslist!=undefined){          
        userslist.forEach(element => {
            if(login.user==element.name && login.pass==element.pass){
                userexist=true;
            }
            
        });
        if(userexist){
            res.write("login successfully");
        }
        else
        {
            res.write("login Failed");
        }
        }
        
 
    }
    if(pathinfo.pathname=="/signup"){
        res.write(signup);
    }

    if(pathinfo.pathname=="/newuser"){
        
        let users=pathinfo.query;
        res.write("New User Registered successfully");
        res.write(users.user+" "+users.pass+" "+users.email);
        let userslist=JSON.parse(fs.readFileSync("users.json"));
        let cus={name:users.user,email:users.email,pass:users.pass};
        userslist.push(cus);
        fs.writeFileSync("users.json",JSON.stringify(userslist));
        
    }
}


    console.log("client send request");
    res.end();


})
server.listen(9090,()=>{
    console.log("server listning")
})