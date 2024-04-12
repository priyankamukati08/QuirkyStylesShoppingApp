/******************************************************************************************
Author: Priyanka Mukati
Date: 12/03/2022
Source code description: Controller for authorization and authentication of the user.
*******************************************************************************************/

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
const AppError = require('./../utilities/appError');
const util = require('util');
const APIFeatures = require('./../dataBaseManager/loanDbContext');


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);
};

exports.getSignInForm = async (req, res, next) => {
  try {

    const newUser = await User.create({
      firstName: req.body.fname,
      lastName: req.body.lname,
      phoneNumber: req.body.pnumber,
      address: req.body.address,
      gender: req.body.gender,
      dateOfBirth: req.body.dateofbirth,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.cpassword, // this needs to be changed
      role: req.body.email.includes('@payeasyloans.com') ? 'admin' : 'user'
    });
    res.status(200).render('login', {
      title: 'Signup | Enter User Credentials'
    });
} catch (err) {
  res.status(404).render('newUser',{
    status: 'fail',
    message: err
  });
}
};
  

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    res.status(400).render('login', {
      title: 'Login | Enter User Credentials',
      err:'Please provide email and password!'
    });
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password))) {
    res.status(401).render('login', {
      title: 'Login | Enter User Credentials',
      err:'Incorrect email or password!'
    });
  }else{
  
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
  
  res.status(200).render('userProfilePage', {
    title: 'My Profile',
    user: user
   });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).render('logout', {
    title: 'Logout successfully',
   });
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.cookie) {
    let cookies = req.headers.cookie.split(';');
    for(cookie of cookies) {

      const keyValuePair = cookie.split('=');
      const key = keyValuePair[0];
      const value = keyValuePair[1];

      if(key.trim() == 'jwt') {
        token = value;
        break;
      }
    }
  }


  if (!token) {
    return(
    
    res.status(401).render('alert', {
      title: 'Error Out',
      err:'You are not logged in! Please log in to get access!'
    }));
  }

  // 2) Verification token
  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  req.user = currentUser;
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  
  if (!currentUser.changedPasswordAfter(decoded.iat)) {
    return next();  
  } else {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await util.promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (!currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      } else {
        return next(
          new AppError('User recently changed password! Please log in again.', 401)
        );
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

