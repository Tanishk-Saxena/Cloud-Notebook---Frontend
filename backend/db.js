const mongoose = require("mongoose");


const mongoUri = "mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";


const connectToMongo = async () => {
    mongoose.connect(mongoUri, () => {
        console.log("Connected to MongoDB successfully");
    })
}

module.exports= connectToMongo;