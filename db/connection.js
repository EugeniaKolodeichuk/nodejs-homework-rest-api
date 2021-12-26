require('dotenv').config()
const mongoose = require('mongoose')

const connectMongo = async () => {
  return mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log('err:', err)
        process.exit(1)
      }
      if (!err) {
        console.log('Database connection successful')
      }
    }
  )
}

module.exports = { connectMongo }
