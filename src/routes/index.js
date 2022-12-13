var express = require('express');
var router = express.Router();
const categoy=require("./category")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use("/cate",categoy)
module.exports = router;
