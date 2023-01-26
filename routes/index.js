var express = require('express');
var router = express.Router();
const Message = require('../models/message');

/* Show all message in the database if user logged in. else redirect to login page */
router.get('/', async (req, res, next) => {
  const message = await Message.find();
  console.log(message);
  if (req.user) {
    res.render('index', { title: 'Express', user: req.user, message: message });
  }
  else {
    res.redirect('/User/sign-in');
  }
});

module.exports = router;
