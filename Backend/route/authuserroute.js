const express = require('express');
const router = express.Router();
const authuser = require('../model/authuser');
const bcrypt = require('bcrypt');
const machine = require('../model/machine');
const suplement = require('../model/suplement');

router.get("/test", (req,res) => {
    res.send("hello authuser");
});

router.post("/register", async (req,res) => {

    try{
    const {uname,uemail,uaddress,upassword,urole} = req.body;
    
    let exuser = await authuser.findOne({uemail});
    if(exuser){
        return res.status(400).json({msg: "already registered"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(upassword,salt);
    const userrole = urole && ['user', 'admin'].includes(urole)? urole:"user";

    const newuser = new authuser({
        uname,uemail,uaddress,upassword:hashedPassword,urole:userrole
    })
    await newuser.save();

    res.status(201).json({msg: "registered successfully"});

    }catch(e){
        res.status(500).json({msg: "registered unsuccessfullly", error: e.message});
    }

})

router.post("/login", async (req,res) => {
    try{
        const {uemail, upassword} = req.body;

        const exuser = await authuser.findOne({uemail});
        if(!exuser){
            return res.status(404).json({msg: "user not found"});
        }

        const isMatch = await bcrypt.compare(upassword,exuser.upassword);
        if(!isMatch){
            return res.status(401).json({msg: "invalid credentials"})
        }

        req.session.authuser = {id: exuser.id, uname: exuser.uname, uemail: exuser.uemail, urole: exuser.urole};
        

        res.status(200).json({msg: "successfully login", authuser:req.session.authuser})
    }catch(e){
        res.status(500).json({msg: "login unsuccessfully ", error: e.message});
    }
})

router.get("/profile", async (req,res) => {
    try{
        
        if(!req.session.authuser){
        return res.status(401).json({msg: "unauthorized"});
        }

        const exuser = await authuser.findById(req.session.authuser.id);
        if(!exuser){
            return res.status(404).json({msg: "user not found"});
        }

        const exmachine = await machine.find({userid: req.session.authuser.id});
        if(!exmachine){
            return res.status(404).json({msg: "machine not found"});
        }

         const exsupplement = await suplement.find({userid: req.session.authuser.id});
        if(!exsupplement){
            return res.status(404).json({msg: "supplement not found"});
        }

        res.status(200).json({ authuser: exuser, machine: exmachine, supplement: exsupplement});
    
    }catch(e){
        res.status(500).json({msg: "server error", error: e.message});
    } 
})

router.post("/logout", async (req,res) => {
    
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json({msg: "logout unsuccessfully"});
            }
            res.status(200).json({msg: "logout successfully"});
        });
        
})

router.put("/update", async (req,res) => {
    try{
        const {uname,uaddress} = req.body;

        if(!req.session.authuser){
            return res.status(401).json({msg: "unauthorized"})
        }

       await authuser.findByIdAndUpdate(req.session.authuser.id,
            {uname,uaddress},
            {new: true}
        );

        res.status(200).json({msg: "successfully updated"});
 
    }catch(e){
        res.status(500).json({msg: "server error", error: e.message});
    }
})

module.exports = router;

