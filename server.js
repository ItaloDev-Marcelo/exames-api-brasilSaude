require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const connectToDb = require('./database/database');
const authRoute = require('./routes/auth')

connectToDb();

app.use(express.json())
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})

