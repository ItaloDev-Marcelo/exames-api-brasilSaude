const Exames = require('../models/Exames');

const allExames = async (req, res) => {
    try {
     const all = await Exames.find({});
     if(all?.length > 0) {
        return res.status(200).json({
            success: false,
            message: 'exames found !',
            examStatus: all
        })
     }
    }catch(e) {
     console.log(e)
     res.status(500).json({
        success: false,
        message: 'something went wrong please try again'
     })
    }
}

const addExames = async (req, res) => {
    try {
      const newExame = req.body;
      const exameAdd = await Exames.create(newExame)
      
      if(exameAdd) {
        return res.status(200).json({
            success: true,
            message: 'new exame add to the database !'
        })
      }
    }catch(e) {
     console.log(e)
     res.status(500).json({
        success: false,
        message: 'something went wrong please try again'
     })
    }
}

const updateExames = async (req, res) => {
    try {
     const AllExames = req.body
     const currentExame = req.params.id;
     const updateExame = await Exames.findOneAndUpdate(currentExame,AllExames, {new: true});


     if(!updateExame) {
        return res.status(400).json({
            success: false,
            message: 'data not found please try again'
        })
     } else {
        return res.status(200).json({
            success: true,
            message: 'Exame updated successfully!',
            examStatus: updateExame
        })
     }

    }catch(e) {
        console.log(e)
     res.status(500).json({
        success: false,
        message: 'something went wrong please try again'
     })
    }
}

const deleteExame = async (req, res) => {
      try {
       const currentDeleteExame = req.params.id;
       const deletedExame = await Exames.findByIdAndDelete(currentDeleteExame);

       if(!deletedExame) {
         return res.status(404).json({
            success: false,
            message: 'not user found with this ID, please try again'
         })
        }

           res.status(200).json({
                    success: true,
                    message: 'User deleted successfully !'
                 })
        
      }catch(e) {
        console.log(e)
     res.status(500).json({
        success: false,
        message: 'something went wrong please try again'
     })
      }
     
}


module.exports = 
{allExames,addExames, updateExames, deleteExame}