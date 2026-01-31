const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db_connection");
const User = require("./models/users");
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
    catch(err){
        console.log("Error Fetching Data", err);
    }
})




app.listen(3000, () => {
    console.log("Server Started");
})