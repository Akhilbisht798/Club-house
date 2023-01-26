var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Message = require('../models/message');
var router = express.Router();

/* GET users listing. */

// Show all message created by user.
// if user not logged in show log-in link or sign up link. 
router.get('/', async (req, res, next) => {
  const data = await Message.find({ "userID": req.user?._id });
  res.render('user', { user: req.user, data: data });
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
  const username = req.user.username;
  const newMsg = new Message({
    title: title,
    message: message,
    userID: id,
    date: date,
    username: username
  }).save(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/')
  })
});

/** Become Admin or Memeber */

router.get("/admin", (req, res, next) => {
  res.render("admin");
})

router.post('/admin', async (req, res, next) => {
  const passcode = req.body.passcode;
  const user = User.findOne({ username: req.user.username, password: req.user.password });
  if (passcode === process.env.ADMIN) {
    await user.updateOne({ admin: true });
    res.redirect('/');
  }
  else {
    res.send(`<h1>Wrong Passcode</h1>`)
  }
});

router.get("/member", async (req, res, next) => {
  res.render("member");
});

router.post("/member", async (req, res, next) => {
  const passcode = req.body.passcode;
  const user = User.findOne({ username: req.user.username, password: req.user.password });
  if (passcode === process.env.MEMBER) {
    await user.updateOne({ isMember: true });
    res.redirect("/");
  } else {
    res.send(`<h1>Wrong Passcode</h1>`);
  }
})


module.exports = router;
