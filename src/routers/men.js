const express = require('express');
const router = new express.Router();
const mensRanking = require("../models/mens");


// we will handle the post request
router.post("/mens", async (req, res) => {
    try {
      const addMensRecords = new mensRanking(req.body);
      console.log(req.body);
      const insertMens = await addMensRecords.save();
      res.send(insertMens);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // we will handle the get request for all documents
  router.get("/mens", async (req, res) => {
    try {
      const getMens = await mensRanking.find({}).sort({"ranking":1});
      res.status(200).send(getMens);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // we will handle the get request for individual
  router.get("/mens/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const getMen = await mensRanking.findById({ _id });
      res.status(200).send(getMen);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // we will update the data
  router.patch("/mens/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const updateMen = await mensRanking.findByIdAndUpdate({ _id },req.body,{
          new: true
      });
      res.send(updateMen);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  router.delete("/mens/:id", async (req, res) => {
    try {
      const deleteMens = await mensRanking.findByIdAndDelete(req.params.id);
      res.send(deleteMens);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  module.exports = router;