const category = require("../models/catrgory");
const { response } = require("../common/response");
const ObjectID = require("mongodb").ObjectID;
module.exports = {
  async cerateCategories(req, res) {
    try {
      const { categories } = req.body;

      //categories validation
      if (!categories)
        return res.status(400).send(response("categories is require!"));

      // find any existing data
      const cate = await category.findOne({
        categoriesName: categories,
        storeId: req.auth.storeId,
        status: "ACTIVE",
      });
      if (cate)
        return res.status(400).send(response("categories already exist"));

      const newCate = await category.create({
        categoriesName: categories,
        storeId: req.auth.storeId,
        status: "ACTIVE",
      });

      return res.status(200).send(response("categories cerate successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("categories create fail"));
    }
  },
  async getAllCategories(req, res) {
    try {
      const newCate = await category.find({
        status: "ACTIVE",
        storeId: req.auth.storeId,
      });

      return res.status(200).send(newCate);
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("categories get fail"));
    }
  },
  async deleteCategories(req, res) {
    try {
      const id = req.params.id;
      // const categories = (await category.find({storeId: req.auth.storeId}))
      // console.log(categories);
      //categories validation
      if (!id) return res.status(400).send(response("id is require!"));

      // find any existing data
      const cate = await category.findById(id)
      if (!cate)
        return res.status(400).send(response("id do not exist"));

      const newCate = await category.updateOne(
        { _id: new ObjectID(id) },
        { status: "IN_ACTIVE" }
      );

      return res.status(200).send(response("categories delete successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("categories delete fail"));
    }
  },
  async updateCategories(req, res) {
    try {
      const id = req.params.id;
      const { categories } = req.body;
      //categories validation
      if (!id) return res.status(400).send(response("id is require!"));
      if (!categories)
        return res.status(400).send(response("categories is require!"));
      // find any existing data
      const cate = await category.findOne({ _id: new ObjectID(id) });
      if (cate === null)
        return res.status(400).send(response("id do not exist"));

      const updateCate = await category.updateOne(
        { _id: new ObjectID(id) },
        { categoriesName: categories }
      );

      return res.status(200).send(response("categories update successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("categories delete fail"));
    }
  },
};
