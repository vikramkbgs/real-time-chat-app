const express = require('express');

const router = express.Router();

router.get('/Home', (req, res)=>{
    return res.send("You are at Home Page");
} );

router.get("/", (req, res) => {
  return res.send("You are at Home Page");
});

router.use("/User", require('./userRoute'));

module.exports = router;
