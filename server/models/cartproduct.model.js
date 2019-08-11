const mongoose=require('mongoose');

var Schema=mongoose.Schema;
var cartProduct=new Schema({
    ProdId:String,
    cartId:String,
    amount:Number,
    totalPrice:Number
}) 

module.exports=mongoose.model("cartProduct",cartProduct);