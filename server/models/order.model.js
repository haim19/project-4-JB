const mongoose=require('mongoose');

var Schema=mongoose.Schema;
var order=new Schema({
    customerId:String,
    cartId:String,
    finalPrice:Number,
    scheduled:String,
    city:String,
    street:String,
    generated:String,
    card:Number
}) 

module.exports=mongoose.model("order",order);