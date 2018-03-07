const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp');

var Schema = mongoose.Schema;

//to get the default connection
let db = mongoose.connection;

//Bind connection to error event(to get notification errors)
db.on('error',console.error.bind(console, 'MongoDB connection error'));

//schema is like a java class which is mapped to the db table
var authorSchema = new Schema({
    _id: {type:Number, required:true},
    fName: {type:String, required:true},
    mName: {type:String, required:true},
    lName: String
  });

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;