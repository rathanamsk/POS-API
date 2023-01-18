const table = require("../models/table");
const { response } = require("../common/response");
const ObjectID = require("mongodb").ObjectID;
module.exports = {
  //create table
  async createTable(req, res) {
    try {
      const { tableNumber, tableName, chairs } =
        req.body;

      //Product validation
      if (!tableNumber)
        return res.status(400).send(response("Table number is require!"));
      if (!tableName)
        return res.status(400).send(response("Table Name is require!"));
      if (!chairs)
        return res.status(400).send(response("Chair quantity is require!"));

      // find any existing data
      const table_record = await table.findOne({
        tableNumber: tableNumber,
        status: "active",
      });
      if (table_record) return res.status(400).send(response("This table number existed"));
      const newTable = await table.create({
        tableNumber: tableNumber,
        tableName: tableName,
        chairs: chairs,
        status: "ACTIVE",
      });

      return res.status(200).send(response("Table created successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Fail to create new table"));
    }
  },

  //get all product
  async getAllTable(req, res) {
    try {
      const tables = await table.find({ status: "ACTIVE" });
      return res.status(200).send(tables);
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Fail to get all the products"));
    }
  },

  //   //get all product
  async getAllAvailableTable(req, res) {
      try {
        const tables = await table.find({ status: "active" });
        return res.status(200).send(tables);
      } catch (err) {
        return res.status(500).send(response("Fail to get all the products"));
      }
    },

  //delete product by id
  async deleteTable(req, res) {
    try {
      const id = req.params.id;
      //Product validation
      if (!id) return res.status(400).send(response("id is require!"));

      // find any existing data
      const table_record = await table.findOne({ _id: new ObjectID(id) });
      if (table_record === null)
        return res.status(400).send(response("id do not exist"));

      const newTable = await table.updateOne(
        { _id: new ObjectID(id) },
        { status: "inactive" }
      );
      return res.status(200).send(response("Table delete successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Table delete fail"));
    }
  },

  //update a product by id
  async updateTable(req, res) {
    try {
      const id = req.params.id;
      const { tableNumber, tableName, chairs, status } = req.body;

      //Product validation
      //Product validation
      if (!tableNumber)
        return res.status(400).send(response("Table number is require!"));
      if (!tableName)
        return res.status(400).send(response("Table Name is require!"));
      if (!chairs)
        return res.status(400).send(response("Chair quantity is require!"));
      if (!status)
        return res.status(400).send(response("Status is require!"));

      // find any existing data
      const table_record = await table.findOne({ _id: new ObjectID(id) });
      if (table_record === null)
        return res.status(400).send(response("id do not exist"));

      const updateTable = await table.updateOne(
        { _id: new ObjectID(id) },
        {
          tableNumber: tableNumber,
          tableName: tableName,
          chairs: chairs,
          status: "active",
        }
      );

      return res.status(200).send(response("Table update successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Table delete fail"));
    }
  },
};
