const mongoose = require('mongoose');
const debuger = require('debug')('development:mongoose');

const config = require('config')
mongoose.connect(`${config.get("MONGODB")}/Scatch`)
.then(()=>{
    debuger('Successfully Connected to Scatch');
})
.catch((e)=>{
    debuger('Error:\n',e);
});
module.exports = mongoose.connection;