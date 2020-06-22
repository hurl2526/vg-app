const mongoose = require('mongoose')
const Games = require('./routes/Games/models/Game')
const gameSeed = require('./gameSeed.json')
require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`MongoDB Error: ${err}`));

  (async ()=>{
    try {
      await Games.deleteMany();//creates clean slate in db
      
      const data = await Games.create(gameSeed)
      console.log(`${data.length} records created`)

      await mongoose.disconnect()

      console.log('MongoDB Disconnected')
      process.exit(0)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  })()