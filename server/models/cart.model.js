const mongoose=require('mongoose');

var Schema=mongoose.Schema;
var cart=new Schema({
    customer:String,
    creationDate:String
}) 

module.exports=mongoose.model("cart",cart);