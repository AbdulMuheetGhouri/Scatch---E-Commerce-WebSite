const express = require("express");
const app = express();
const DBConn = require("./config/mongoose-connection");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const userModel = require('./models/user-model');
const ownerModel = require('./models/owner-model');
const productModel = require('./models/product-model');
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const jwt = require('jsonwebtoken');



// loading the data from .env file;
require('dotenv').config();


app.use(cookies());

app.use(
  expressSession({
    saveUninitialized: false,
    secret: process.env.SESSION_KEY,
    resave: true,
  }),
);
app.use(flash());




app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

/* ============== MIDDLEWARES ============== */
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use("/users", userRoutes);
// app.use("/products", productRoutes);
// app.use("/owners", ownerRoutes);

/* ============== STARTING CODE ============== */

app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});

/* ============== OWNER'S CODE ============== */

// starting code
app.get("/owners", (req, res) => {
  res.send("owner working");
});

// owner create

if (process.env.NODE_ENV === "development") {
  app.post("/owners/create", async (req, res) => {
    let owner = await ownerModel.find();
    let { fullname, email, password } = req.body;
    if (owner.length > 0) {
      return res
        .status(503)
        .send("you are not allowed to be an owner, there is already one.");
    }
    owner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    await owner.save();
    res
      .status(201)
      .send("Congrats! from now on, you are the owner of this store", owner);
  });
}

/* ================ PRODUCTS CODE ================ */ 

// starting code
app.get('/products',(req,res)=>{
    res.send('product working');
});

/* ================ USERS CODE ================ */ 

app.get("/", (req,res)=>{
    res.render("index");
})

app.get("/users/register",(req,res)=>{
    res.render("register");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/users/register", async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let RegisteredUser = await userModel.findOne({ email });


    if (RegisteredUser) {
      req.flash('error', `User Already Registered.\nPlease Try Another email`);
      return res
      .status(400)
      .redirect('/users/register');      
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.send(err.message);
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        RegisteredUser = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        
        // setting the token
        console.log(process.env);
        let token = jwt.sign({email, id: RegisteredUser._id},process.env.JWT_KEY);
        res
        .cookie("token",token)
        .send('User Registered successfully');
        
      });

    });
  } catch (e) {
    res.send(e.message);
  }
});
