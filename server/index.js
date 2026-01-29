const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.post("/api/create", async(req, res) => {
    try{
        console.log(req);
    }
    catch(err){
        console.log(err);
    }
})




app.listen(3000, () => {
    console.log("Server Started");
})