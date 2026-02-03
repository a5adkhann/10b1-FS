const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
})


const Product = mongoose.model("product",productSchema)
module.exports = Product