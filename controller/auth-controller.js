const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = async (req,res) => {
  try {
    const {name, email,password, role} = req.body;

    const userExists = await User.findOne({
        $or: [{name}, {email}],
    }) 

    if(userExists) {
        return res.status(401).json({
            success: false,
            message: 'Sorry but user already exist with same name or email, please try again'
        })
    }

    // tenho que criptografar a senha

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(password, salt);

    const newlyCreaterUser = new User({
        name,
        email,
        password: newHashedPassword,
        role: role || 'user'
    })

    console.log(req.body)

    await newlyCreaterUser.save();

    if(newlyCreaterUser) {
       res.status(201).json({
            success: true,
            message: 'User registered with success'
        })
    }else {
       res.status(404).json({
            success: false,
            message: 'unable to registration user please try again.!'
        })
    }
  }catch(e) {
     console.log(e)
     res.status(500).json({
        success: false,
        message: 'some error occured, please try again'
     })
  }

}

const loginController = async (req,res) => {
    try {
      const {email, password} = req.body;

    // check if user exists 

    const user = await User.findOne({email})

    if(!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found please try again '
        })
    }
    // criar bear token  

    // verificar a senha salva e a senha passada 

    const passwordMatched = await bcrypt.compare(password, user.password);

    if(!passwordMatched) {
       return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
       })
    }

    const accessToken = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role : user.role 
        },
           process.env.JWT_SECRET_KEY,
        {
         expiresIn : '30m'
        },
    )


    res.status(201).json({
        success: true,
        message: 'User logged in success',
        accessToken
    })

    }catch(e) {
        console.log(e)
     res.status(500).json({
        success: false,
        message: 'some error occured, please try again'
     })
    }


}

const resetPasswordController = async (req,res) => {
   try {
     const userId = req.userInfo.userId;
     const {oldPassword, newPassword} = req.body;

    const user = await User.findById(userId)

    if(!userId) {
        return res.status(400).json({
            success: false,
            message: `User do not exist`
        })
    } 

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password)

    if(!isPasswordMatched) {
         return res.status(400).json({
            success: false,
            message: 'Old password is not correct! Please try again.'
         })
    }


    const salt = await bcrypt.genSalt(10);
    const newlyCreatedPassword = await bcrypt.hash(newPassword, salt)

    user.password = newlyCreatedPassword
    await user.save();
     
    res.status(200).json({
        success: true,
        message: 'Password changed with sucess!'
    })
   }catch(e) {
    console.log(e)
        res.status(500).json({
        success: false,
        message: 'some error occured, please try again'
     })
   }
}


module.exports = {authController,loginController, resetPasswordController}