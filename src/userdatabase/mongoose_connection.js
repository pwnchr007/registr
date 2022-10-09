const mongoose = require('mongoose')
const users_collection1 = require('./userdata')

mongoose.connect('mongodb://localhost:27017/myuserdata')
.then(()=>{console.log('mongoose connection successful')})
.catch((_err)=>{console.log('err')})