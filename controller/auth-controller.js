const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = async (req,res) => {
  try {
    const {name,email,password} = req.body;

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
        password: newHashedPassword
    })

    await newlyCreaterUser.save();

    if(newlyCreaterUser) {
       res.status(201).json({
            success: true,
            message: 'Usuario registrado com sucesso'
        })
    }else {
       res.status(404).json({
            success: false,
            message: 'Não foi possível cadastrar o usuário. Por favor, tente novamente.!'
        })
    }
  }catch(e) {
     console.log(e)
     res.status(500).json({
        success: false,
        message: 'ocorreu algum error, Por favor tente novamente'
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
            message: 'Usuario não encontrado, Por favor tente novamente! '
        })
    }
    // criar bear token  

    // verificar a senha salva e a senha passada 

    const passwordMatched = await bcrypt.compare(password, user.password);

    if(!passwordMatched) {
       return res.status(400).json({
        success: false,
        message: 'Credencias invalidas'
       })
    }

    const accessToken = jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
           process.env.JWT_SECRET_KEY,
        {
         expiresIn : '30m'
        },
    )


    res.status(201).json({
        success: true,
        message: 'Usuario logado com sucesso',
        accessToken
    })

    }catch(e) {
        console.log(e)
     res.status(500).json({
        success: false,
        message: 'ocorreu algum error, Por favor tente novamente'
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
            message: `Usuario não existe!`
        })
    } 

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password)

    if(!isPasswordMatched) {
         return res.status(400).json({
            success: false,
            message: 'A senha antiga nao esta correta ! Por favor tente novamente'
         })
    }


    const salt = await bcrypt.genSalt(10);
    const newlyCreatedPassword = await bcrypt.hash(newPassword, salt)

    user.password = newlyCreatedPassword
    await user.save();
     
    res.status(200).json({
        success: true,
        message: 'Senha foi atualizada com sucesso!'
    })
   }catch(e) {
    console.log(e)
        res.status(500).json({
        success: false,
        message: 'ocorreu algum error, Por favor tente novamente'
     })
   }
}


module.exports = {authController,loginController, resetPasswordController}