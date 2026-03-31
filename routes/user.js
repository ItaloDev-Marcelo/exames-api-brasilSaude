const express = require('express');
const router = express.Router();

const {allExames,addExames, updateExames, deleteExame} = require('../controller/exames-controller')

router.get('/todosOsExames',allExames)
router.post('/addExames',addExames)
router.put('/updateExame/:id',updateExames)
router.delete('/removeExame/:id',deleteExame)

module.exports = router

