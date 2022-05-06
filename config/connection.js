const mongoose = require('mongoose');//require mongoose package
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/snapi');//create connection with external db or local host
module.exports = mongoose.connection;//export connection
