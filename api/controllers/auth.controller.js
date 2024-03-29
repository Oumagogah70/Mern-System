const User =require('../models/user.model.js');
const bcryptjs =require('bcryptjs');
const { errorHandler } =require('../utils/error.js');
const jwt =require('jsonwebtoken');

const signup = async (req, res, next) => {
  const { username, names,contact,email, password } = req.body;

  if (
    !username ||
    !email ||
    !names ||
    !contact ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    names,
    contact,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    // next(errorHandler(400, 'All fields are required'));
    return res.status(400).json({success: false, message: "All fields are required"})
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({success:false,message:'User not found'});
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({success:false,message:'Invalid password'});
    }
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({...rest,username: validUser.username});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message:"Internal server error"})
  }
};

const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // const token = jwt.sign(
      //   { id: user._id, isAdmin: user.isAdmin },
      //   process.env.JWT_SECRET
      // );
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      // const token = jwt.sign(
      //   { id: newUser._id, isAdmin: newUser.isAdmin },
      //   process.env.JWT_SECRET
      // );
      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const authMiddle = async(req,res)=>{
  res.status(200).json({user:req.user})
}

module.exports ={signup, signin, google, authMiddle}