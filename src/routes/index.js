var express = require("express");
var router = express.Router();
const categoy = require("./category");
const product = require("./product");
const table = require("./table");
const dailySell = require("./dailySell");
const invoice = require("./invoice")

const dailysellModel=require("../models/dailySell")
const tableModel = require("../models/table");
const { response } = require("../common/response");
const ObjectID = require("mongodb").ObjectID;
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "POS-API" });
});
router.post("/confirm-payment", async function (req, res, next) {
  const { dailysellId, tabelId } = req.body;
  try {
    await tableModel.updateOne({ _id: new ObjectID(tabelId) }, {status : "active"});
    await dailysellModel.updateOne({ _id: new ObjectID(dailysellId) }, {status : "inactive"});
    return res.status(200).send(response("confirm payment sucess"));
  } catch (error) {
    return res.status(500).send(response("confirm payment fail"));
  }
});
router.use("/", categoy);
router.use("/", product);
router.use("/", table);
router.use("/", invoice);
router.use("/", dailySell);

module.exports = router;
