const mongoose = require('mongoose');

// Here .connect() is going to Perform Async Opern which is connecting to our MongooseDB and will return a Promise.
const connectDB = (url)=>{
    return mongoose.connect(url,{
        useNewUrlParser   : true,
        useCreateIndex    : true,
        useFindAndModify  : false,
        useUnifiedTopology: true
    });
}
module.exports = connectDB;