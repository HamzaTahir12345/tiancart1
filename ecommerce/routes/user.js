const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  userById,
  read,
  update,
  purchaseHistory,
  forgetPasswordLink,
  forgetPassword,
} = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: "got here yay",
  });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);
router.put("/user/:userId", requireSignin, isAuth, update);
router.post("/forget-password-link", forgetPasswordLink);
router.post("/forget-password", forgetPassword);
router.param("userId", userById);

module.exports = router;
