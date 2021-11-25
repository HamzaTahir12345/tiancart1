const User = require("../models/user");
const { errorHandler } = require("../helper/dbErrorHandler");
const { Order } = require("../models/order");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: `${process.env.SENDGRID_API_KEY}`,
    },
  })
);
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not foundd",
      });
    }
    req.profile = user;
    next();
  });
};
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body.user },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          err: "You're not authorized to perform this action",
        });
      } else {
        user.hashed_password = undefined;
        user.salt = undefined;
        if (req.body.user.name) {
          user.name = req.body.user.name;
        }
        if (req.body.user.email) {
          user.password = req.body.user.password;
        }
        if (req.body.user.password) {
          user.passsword = req.body.user.password;
        }
        console.log("----------------user g-------", user);

        res.json(user);
      }
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        res.json(orders);
      }
    });
};
exports.forgetPasswordLink = (req, res) => {
  crypto.randomBytes(20, function (err, buf) {
    var token = buf.toString("hex");

    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "Please Enter the correct Email" });
        // return res.redirect("/forgot");
      }

      user.resetPasswordToken = token;
      //  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      User.findOneAndUpdate(
        {
          email: req.body.email,
        },
        { resetPasswordToken: token }
      );
      transporter.sendMail({
        to: user.email,
        from: "tincart.com",
        subject: "TinCard Password Reset",
        // text: ` CLICK ON THIS LINK TO RESET YOUR PASSWORD ========>
        // ${process.env.HOST}/forgetpassword/${token} `,
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          process.env.HOST +
          "/forgetpassword/" +
          token +
          "\n\n" +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      });
      return res.status(200).send({
        success: true,
        message: "Reset Password Email Sent Successfully",
      });
    });
  });
};
exports.forgetPassword = (req, res) => {
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  User.findOne({ resetPasswordToken: req.params.token }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Token is invalid" });
      // return res.redirect("/forgot");
    }

    if (password !== confirmpassword) {
      return res
        .status(404)
        .send({ success: false, message: "Password Must Match" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          User.findOneAndUpdate(
            {
              email: user.email,
            },
            { password: hash, resetPasswordToken: null }
          );

          // res.json({ success: true });
        });
      });

      res.status(200).send({
        success: "You Have Changed your Password Successfully",
      });
    }
  });
};
exports.hightestDiscountProduct = (req, res) => {
  Product.find({})
    .sort({ discount: -1 })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }

      res.json({
        data,
      });
    });
};
