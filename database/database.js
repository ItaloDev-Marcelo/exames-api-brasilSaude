const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDb connect successfully!')
  }catch(e) {
    console.log(e)
    console.log('Error to connect to mongoDb, please try again!')
    process.exit(1)
  }
}

module.exports = connectToDb;