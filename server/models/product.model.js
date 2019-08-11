const mongoose=require('mongoose');

var Schema=mongoose.Schema;
var products=new Schema({
    title:String,
    categoryType:String,
    url:String,
    price:Number
}) 

module.exports=mongoose.model("product",products);