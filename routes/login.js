var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Message = require('../models/message');
var router = express.Router();

/* GET users listing. */

// Show all message created by user.
// if user not logged in show log-in link or sign up link. 
router.get('/', (req, res, next) => {
  res.render('user', { user: req.user });
})

/* sign in */
router.get('/sign-in', function (req, res, next) {
  res.render('log-in');
});

/* sign up */
router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
})

router.post(
  "/sign-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
)

router.post("/sign-up", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    isMember: false
  }).save(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/')
  })
})

/* Add A message */
router.get("/newMessage", (req, res, next) => {
  res.render('addmessage');
})

router.post('/newMessage', (req, res, next) => {
  const title = req.body.title;
  const message = req.body.message;
  const date = new Date();
  const id = req.user.id;
  const newMsg = new Message({
    title: title,
    message: message,
    userID: id,
    date: date
  }).save(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/')
  })
})

module.exports = router;
