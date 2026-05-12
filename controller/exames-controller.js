const Exames = require('../models/Exames');

const allExames = async (req, res) => {
    try {
     const all = await Exames.find({});
     if(all?.length > 0) {
        return res.status(200).json({
            success: false,
            message: 'Arquivos de exames encontrados!',
            examStatus: all
        })
     }
    }catch(e) {
     console.log(e)
     res.status(500).json({
        success: false,
        message: 'Algo saiu errado, Por favor tente novamente!'
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
            message: 'Novo arquivo de exame adicionado!'
        })
      }
    }catch(e) {
     console.log(e)
     res.status(500).json({
        success: false,
        message: 'Algo saiu errado, Por favor tente novamente!'
     })
    }
}

const updateExames = async (req, res) => {
    try {
     const AllExames = req.body
     const currentExame = req.params.id;
 const updateExame = await Exames.findByIdAndUpdate(
  currentExame,
  AllExames,
  { returnDocument: 'after' }
)

     if(!updateExame) {
        return res.status(400).json({
            success: false,
            message: 'Arquivo não encontrada, Por favor tente novamente'
        })
     } else {
        return res.status(200).json({
            success: true,
            message: 'Arquivo de exame atualizado com sucesso !',
            examStatus: updateExame
        })
     }

    }catch(e) {
        console.log(e)
     res.status(500).json({
        success: false,
        message: 'Algo saiu errado, Por favor tente novamente!'
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
            message: 'Nenhum arquivo encontrado com esse ID, Por favor tente novamente'
         })
        }

           res.status(200).json({
                    success: true,
                    message: 'Arquivo deletado com sucesso !'
                 })
        
      }catch(e) {
        console.log(e)
     res.status(500).json({
        success: false,
        message: 'Algo saiu errado, Por favor tente novamente!'
     })
      }
     
}


module.exports = {allExames,addExames,updateExames,deleteExame}