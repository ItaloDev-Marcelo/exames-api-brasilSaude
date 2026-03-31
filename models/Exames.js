const mongoose = require('mongoose');

const ExamesSchema = new mongoose.Schema({
    paciente: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    exame: {
        type: String,
        required: true,
        trim: true,
    },
    data: {
        type: String,
        required: true,
    },
    andamento: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Exames',ExamesSchema)