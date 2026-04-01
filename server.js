require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const connectToDb = require('./database/database');
const authRoute = require('./routes/auth')
const examesRoute = require('./routes/user')
const cors = require('cors')
app.use(cors())
connectToDb();

app.use(express.json())
app.use('/api/auth', authRoute);
app.use('/api/exames', examesRoute);

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})

