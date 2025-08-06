const express = require('express');
const router = express.Router();
const machine = require('../model/machine');
const authuser = require('../model/authuser');

router.get("/test1", (req,res) => res.send("hello machine"));

router.post("/addmachine", async (req,res) => {

    try{

        if (!req.session.authuser) {
            return res.status(401).json({ msg: "Not authenticated" });
          }
      
          
          const user = await authuser.findById(req.session.authuser.id);
          if (!user) {
            return res.status(403).json({ msg: "user access required" });
          }


        const newmachine = new machine({
            mtitle:req.body.mtitle,
            mprice:req.body.mprice,
            mdescription:req.body.mdescription,
            mstatus:req.body.mstatus,
            userid:req.session.authuser.id
        })

        await newmachine.save();

        res.status(201).json({
            msg: "machine successfully added",
            machine: newmachine
        });

    }catch(e){
        res.status(500).json({msg: "machine added failed"});
    }
})

router.get("/getmachine", async (req,res) => {
    try{
        const newmachine = await machine.find();
        res.json(newmachine);
    }catch(e){
        res.status(500).json({msg: "machine not found"});
    }
})

router.get("/getmachineid/:id", async (req,res) => {
    try{
        const newmachine = await machine.findById(req.params.id);
        res.json(newmachine);
    }catch(e){
        res.status(500).json({msg: "machine not found"});
    }
})



module.exports = router;