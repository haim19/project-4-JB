const mongoose=require('mongoose');

var Schema=mongoose.Schema;
var customers=new Schema({
    name:String,
    lastName:String,
    email:String,
    clientId:Number,
    password:String,
    city:String,
    street:String,
    role:String
}) 

module.exports=mongoose.model("customer",customers);