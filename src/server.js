const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const port = 8000
const users_collection1 = require('./userdatabase/userdata')
require("./userdatabase/mongoose_connection")

const app = express()
const bcrypt = require('bcryptjs')


app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(express.json())

let mainfolder = path.join(__dirname,"../");
app.use(express.static(mainfolder))


// const hashedpassword = async (password)=>{
//     const hashkey = bcrypt.hash(password,12);
//     return hashkey;
// }


app.get('/', (_req,res)=>{
    res.send('home page');
    console.log(__dirname);
    console.log(mainfolder);
})

app.get('/register',(_req,res)=>{
    res.sendFile(mainfolder+"/index.html")
})

app.get('/login',(_req,res)=>{
    res.sendFile(mainfolder+"/login.html")
})

app.post("/register",(req,_res)=>{
    // console.log(req.body);
    let req_userdata = new users_collection1(req.body);
    // console.log(req_userdata);
    if(req_userdata.password == req_userdata.confirm_password){
        req_userdata.save();
        _res.send('Register Successfully') 

    }
    else{
        _res.send("password do not match")
    }
})

app.post("/login", async (_req,_res)=>{
    // _res.send('logged in') 
    let usermail = _req.body.email;
    let userpassword = _req.body.password;

    // console.log(usermail)
    // console.log(userpassword)

    // let mykey_password = await hashedpassword(userpassword)
    // console.log(mykey_password);


    let req_userdata = await users_collection1.findOne({email:usermail});
    if(req_userdata != null){
        // _res.send("email exists")
        const bcrypt_password_match = await bcrypt.compare(userpassword,req_userdata.password)
        console.log(bcrypt_password_match)
        if(bcrypt_password_match == true){
            _res.send('Successfully Logged In')
        }
        else{
            _res.send("Incorrect Password")
        }
    }
    else{
        _res.send("email do not exists")
    }
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})