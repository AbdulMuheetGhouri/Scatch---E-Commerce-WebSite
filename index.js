const express = require('express');
const app = express();
const DBConn = require('./config/mongoose-connection');


// Home
app.get('/users',(req,res)=>{
    res.send('home working');

})



// Starting code
app.listen(3000,(req,res)=>{
    console.log('listening on port 3000');
})