const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db_connection");
const User = require("./models/users");
const Product = require("./models/product");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();


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