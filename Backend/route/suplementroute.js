const express = require('express');
const router = express.Router();
const suplement = require('../model/suplement');
const authuser = require('../model/authuser');

router.get("/test2", (req,res) => res.send("hello suplement"));

router.post("/addsuplement", async (req, res) => {
    try {

      if (!req.session.authuser) {
          return res.status(401).json({ msg: "Not authenticated" });
        }
            
                
        const user = await authuser.findById(req.session.authuser.id);
                
              
      if (!user) {
          return res.status(403).json({ msg: "user access required" });
        }
                
    
      const newsuplement = new suplement({
        stitle: req.body.stitle, 
        sprice: req.body.sprice,
        sdescription: req.body.sdescription,
        sstatus: req.body.sstatus,
        userid:req.session.authuser.id
      });
  
      await newsuplement.save();
  
      res.status(201).json({
        msg: "suplement added successfully",
        suplement: newsuplement
      });
    } catch (e) {
      res.status(500).json({ msg: "suplement add failed"});
    }
  });
  
router.get("/getsuplement", async(req,res) => {
    try{
        const newsuplement = await suplement.find();
        res.json(newsuplement);
    }catch{
        res.status(500).json({msg: "suplement not found"});
    }
})


module.exports = router;