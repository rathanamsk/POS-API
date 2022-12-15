var express = require('express');
var router = express.Router();
const categoy=require("./category")
const product=require("./product")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use("/",categoy)
router.use("/",product)

module.exports = router;
