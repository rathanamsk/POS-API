const { response } = require("../common/response");
const dailySell = require("../models/dailySell");
const table = require("../models/table");
const ObjectID = require("mongodb").ObjectID;
module.exports = {
  //create table
  async createSale(req, res) {
    try {
      const { tableId, productId, quantity } = req.body;
      // check table valid

      //Product validation

      if (!tableId)
        return res.status(400).send(response("Table id is require!"));
      if (!productId.length)
        return res.status(400).send(response("product id is require!"));
      if (!quantity)
        return res.status(400).send(response("product quantity is require!"));

      productId.forEach(async (pro_id) => {
        await dailySell.create({
          tableId: tableId,
          productId: pro_id,
          quantity: quantity,
          status: "ACTIVE",
        })
      });
      Promise.all[
        await table.updateOne(
          {
            _id: new ObjectID(tableId),
          },
          {
            status: "IN_ACTIVE",
          }
        )
      ];
      return res.status(200).send(response("Sale created successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Fail to create sale order"));
    }
  },

  //get all product
  async getAllAvailableSale(req, res) {
    try {
      const sales = await dailySell.find({ status: "ACTIVE" });
      return res.status(200).send(sales);
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Fail to get all the sale"));
    }
  },

  //   //get all product
  async getAllSale(req, res) {
    try {
      const sales = await dailySell.find();
      return res.status(200).send(sales);
    } catch (err) {
      return res.status(500).send(response("Fail to get all the products"));
    }
  },

  async getOrderTable(req, res) {
    try {
      const tableId = req.params.id;
      if (!tableId) {
        return res.status(400).send(response("table id params is require!"));
      }
      const find_table = await table.findById(tableId);
      if (!find_table) {
        return res.status(400).send(response("table not found"));
      }
      const order = await dailySell.find({ tableId, status: "ACTIVE" });
      return res
        .status(200)
        .send(response("successful get order of table", order));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Fail to get order"));
    }
  },

  //delete product by id
  async deleteSale(req, res) {
    try {
      const id = req.params.id;
      //Product validation
      if (!id) return res.status(400).send(response("id is require!"));

      // find any existing data
      const sale_record = await dailySell.findOne({ _id: new ObjectID(id) });
      if (sale_record === null)
        return res.status(400).send(response("id do not exist"));

      const newSale = await table.updateOne(
        { _id: new ObjectID(id) },
        { status: "IN_ACTIVE" }
      );
      return res.status(200).send(response("Table delete successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Table delete fail"));
    }
  },

  //update a product by id
  async updateSale(req, res) {
    try {
      const id = req.params.id;
      const { tableId, productId, quantity } = req.body;

      //Product validation
      if (!tableId)
        return res.status(400).send(response("Table id is require!"));
      if (!productId)
        return res.status(400).send(response("product id is require!"));
      if (!quantity)
        return res.status(400).send(response("product quantity is require!"));
      // find any existing data
      const sale_record = await dailySell.findOne({ _id: new ObjectID(id) });
      if (sale_record === null)
        return res.status(400).send(response("id do not exist"));

      const updateSale = await dailySell.updateOne(
        { _id: new ObjectID(id) },
        {
          tableId: tableId,
          productId: productId,
          quantity: quantity,
          status: "ACTIVE",
        }
      );

      return res.status(200).send(response("Sale update successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Sale update fail"));
    }
  },

  async confirmPayment(req, res) {
    try {
      const { tableId } = req.params.id;

      if (!tableId) {
        return res.status(400).send(response("table id is require"));
      }
      const find_table = await table.findById(tableId);
      if (!find_table) {
        return res.status(400).send(response("table not found"));
      }

      await table.updateOne(
        { _id: new ObjectID(tableId) },
        { status: "ACTIVE" }
      );
      return res.status(200).send(response("confirm payment successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("confirm payment fail"));
    }
  },
};
