const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Scatch')
.then(()=>{
    console.log('Successfully Connected to Scatch');
})
.catch((e)=>{
    console.log('Error:\n',e);
});