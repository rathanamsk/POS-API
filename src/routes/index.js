var express = require('express');
var router = express.Router();
const categoy=require("./category")
const product=require("./product")
const table=require("./table")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'POS-API' });
});
router.use("/",categoy)
router.use("/",product)
router.use("/",table)

module.exports = router;
