const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db_connection");
const User = require("./models/users");
const File = require("./models/files");
const multer = require("multer");
const Product = require("./models/product");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })




app.post("/api/create", async(req, res) => {
    try{
        const { nameField } = req.body;
        await User.insertOne({name: nameField});
        res.status(200).send({message: "User added successfully"});
        console.log(nameField);
    }
    catch(err){
        console.log(err);
    }
})


app.post("/api/fileupload", upload.single("myImage"), async(req, res) => {
    try{
        const { filename } = req.file;
        await File.insertOne({image: filename});
        res.status(200).send({message: "File Uploaded Successfully"});
    }
    catch(err){
        console.log("Error Uploading File", err);
    }
})



app.get("/api/users", async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).send({message: "Users Fetched Successfully", users});
    }
    catch (error) {
        res.json({
            message:error.message,
            error
        })
    }
})


app.put("/api/updateuser/:id", async(req, res) => {
    const { Name } = req.body;
    try{
        await User.updateOne({_id: req.params.id}, {$set: {name: Name}});
        res.status(200).send({message: "User updated successfully"});
    }
    catch(err){
        console.log("Error updating", err);
    }
})


app.delete("/api/deleteuser/:id", async(req, res) => {
    try{
        await User.deleteOne({_id: req.params.id});
        res.status(200).send({message: "User deleted successfully"});
    }
    catch(err){
        console.log("Error deleting data", err);
    }
})













app.post("/api/product/create",async(req,res)=>{
    let {title,description,price} = req.body
    try {
        if(!title|| !description|| !price){
            res.json({
                message:"required fields are missing"
            })
        }else{

            let newProduct = await Product.create({title,description,price})
            res.json({
                message:"product created",
                newProduct
            })
        }
    } catch (error) {
        res.json({
            message:error.message,
            error
        })
    }
})

app.listen(3000, () => {
    console.log("Server Started");
})