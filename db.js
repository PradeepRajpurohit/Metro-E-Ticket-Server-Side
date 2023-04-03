const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/metro-e-ticket';

const connectToMongo = () =>{
    mongoose.connect(mongoURI)
    // console.log("connected to mango");
        

    .then(()=>
        console.log("connected to mongose")
    )
}

module.exports = connectToMongo;
