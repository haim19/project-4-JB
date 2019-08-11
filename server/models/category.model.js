const mongoose=require('mongoose');

var Schema=mongoose.Schema;
var categories=new Schema({
    category:String,
}) 

module.exports=mongoose.model("category",categories);