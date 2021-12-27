"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const PORT_NUMBER = 3000;


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var userData = []

app.listen(PORT_NUMBER, (err) => {
    if (err)
        console.log("Server error");
    else
        console.log("Server running on port : " + PORT_NUMBER);
})

app.post('/login', (req, res) => {
    if (userData.length == 0) {
        res.json({
            status: 200,
            msg: "user is not registered"
        })
    } else {
        userData.map((item)=>{
            if(item.email==req.body.email){
                res.json({
                    status:200,
                    msg: "Login successfully.",
                    data:item
                })
            }
        })
       
    }
})

app.post('/registeruser', (req, res) => {
   const newBody = {
        userId: Date.now(),
        ...req.body
      }

    if(userData.length>0){
        userData.map((item)=>{
            if(item.email==req.body.email){
                res.send({
                    status:200,
                    msg:"User already exist",
                    data:newBody
                })
            }else{
                userData.push(newBody)
                res.send({
                    status:200,
                    msg:"User registered successfully.",
                    data:newBody
                })
            }
        })
    }else{
        userData.push(newBody)
        res.json({
            request: newBody
        })
    }
})



app.post('/userList', (req, res) => {

  res.send({
    status:200,
    msg:"User list.",
    data:userData
  })
})

