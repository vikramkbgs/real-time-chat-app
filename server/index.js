const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());


const port  = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.get('/', (req, res) =>{
    return res.send("Welcome on my chat api..");
});

app.listen(port, (req, res)=>{
    console.log(`server running on port... ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection establised"))
  .catch((error) => console.log("MongoDB connection fail", error.message)); 