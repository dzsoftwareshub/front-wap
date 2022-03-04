const express = require("express");
const router = express.Router();

router.get("/",(request,response)=>{
  response.render("index");
});

router.post("/",(request,response)=>{
  response.send("Post request");
});

module.exports = router;
