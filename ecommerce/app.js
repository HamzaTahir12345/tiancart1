const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const mailRoutes = require("./routes/mail.js");
const orderRoutes = require("./routes/order.js");
const session = require("express-session");
const facebookStrategy = require("passport-facebook").Strategy;
const brainTreeRoutes = require("./routes/braintree.js");
const razorpayRoutes = require("./routes/razorpay.js");
const paypalRoutes = require("./routes/paypal.js");
const passport = require("passport");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
//const User = require('../models/user');

require("dotenv").config();

//app
const app = express();

//db
mongoose
  .connect("mongodb://localhost:27017/ecomm", {
    useNewUrlParser: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log("Db Connected!");
  });

//temporary
// app.get('/',(req,res)=>{
//     res.render("index.ejs")
// })

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//middlewares
app.use(cors(corsOptions)); // Use this after the variable declaration
//app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(expressValidator());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", brainTreeRoutes);
app.use("/api", mailRoutes);
app.use("/api", orderRoutes);
app.use("/api", paypalRoutes);
app.use("/api", razorpayRoutes);

//app.set("view engine","ejs")

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new facebookStrategy(
    {
      // pull in our app id and secret from our auth.js file
      clientID: "414276950190373",
      clientSecret: "35b3f99da7558d1d5dfb0895adcc7c35",
      callbackURL: "http://localhost:8000/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "name",
        "gender",
        "picture.type(large)",
        "email",
      ],
    }, // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email,user_photos" })
);

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

app.get("/profile", (req, res) => {
  res.send("You are registered user");
});

// app.get('/failed',(req,res)=>{
//     res.send('You are not a registered user')
// })

passport.serializeUser(function (user, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  return done(null, id);
});

const port = process.env.PORT || 8000;

var listener = app.listen(port, function () {
  console.log("Listening on port " + listener.address().port); //Listening on port 8000
});
