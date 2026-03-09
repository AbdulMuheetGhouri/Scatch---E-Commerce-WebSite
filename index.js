const express = require('express');
const app = express();
const DBConn = require('./config/mongoose-connection');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const ownerRoutes = require('./routes/ownerRoutes');


app.use('/users',userRoutes);
app.use('/products',productRoutes);
app.use('/owners',ownerRoutes);





// Starting code
app.listen(3000,(req,res)=>{
    console.log('listening on port 3000');
})