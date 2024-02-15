const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware.js');
const { checkBody } = require('../modules/checkBody.js');

//================================== POST /auth/signup  - Creates a new user in the database ==================================//
router.post('/signup', async (req, res, next) => {
  const { password, username, email } = req.body;
  try {
    console.log(password, username, email);
    // Check empty strings
    if (!checkBody(req.body, ['username', 'password', "email"]))  {
      res.status(400).json({ message: '🚧 Provide all mandatory information' });
      return;
    }

    // Check the users collection if a user with the same username already exists
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      res.status(400).json({ message: '🚧 User already exists.' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user in the database
    const createdUser = await User.create({
      password: hashedPassword,
      username,
      email
    });

    res.status(201).json({ createdUser });
  } catch (err) {
    next(err);
  }
});
//==================================//==================================//==================================//

//================================== GET  /auth/verify  -  Verify JWT stored on the client ==================================//
router.get('/verify', isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  res.status(200).json(req.payload);
});
//==================================//==================================//==================================//

//================================== POST /auth/login - Log in the user ==================================//

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check empty fields
    if (!checkBody(req.body, ['username', 'password'])) {
      return res.status(400).json({ message: '🚧 Please fill all credential fields' });
    }

    // Check user already exist and pwd is correct
    const currentUser = await User.findOne({ username }).select('_id username password');
console.log(currentUser);
    if (!currentUser) {
      return res.status(400).json({ message: '⛔ Cannot find the user' });
    }

    const matchingPassword = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!matchingPassword) {
      return res.status(401).json({ message: '⛔ Credentials are incorrect' });
    }
    const payload = {currentUser};

    const authToken = jwt.sign( 
      payload,
      process.env.SECRET_TOKEN,
      { algorithm: 'HS256'}
    );

    res.status(200).json({ authToken: authToken });

  } catch (error) {
    next(error);
  }
});

//==================================//==================================//==================================//
module.exports = router;
