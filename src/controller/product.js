const product = require("../models/product");
const { response } = require("../common/response");
const ObjectID = require("mongodb").ObjectID;
module.exports = {
  //create product
  async cerateProduct(req, res) {
    try {
      const { categoryId, productName, productImage, quantity, price } =
        req.body;

      //Product validation
      if (!categoryId)
        return res.status(400).send(response("category ID is require!"));
      if (!productName)
        return res.status(400).send(response("product Name is require!"));
      if (!productImage)
        return res.status(400).send(response("product image is require!"));
      if (!quantity)
        return res.status(400).send(response("quantity is require!"));
      if (!price) return res.status(400).send(response("price is require!"));

      // find any existing data
      const pro = await product.findOne({
        productName: productName,
        status: "active",
      });
      if (pro) return res.status(400).send(response("Product already exist"));

      const newPro = await product.create({
        categoriesId: categoryId,
        productName: productName,
        productImage: productImage,
        quantity: quantity,
        price: price,
        status: "active",
      });

      return res.status(200).send(response("Product cerate successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Product create fail"));
    }
  },

  //get all product
  async getAllProduct(req, res) {
    try {
      const newPro = await product.find({ status: "active" });

      return res.status(200).send(newPro);
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Product get fail"));
    }
  },

  //delete product by id
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      //Product validation
      if (!id) return res.status(400).send(response("id is require!"));

      // find any existing data
      const pro = await product.findOne({ _id: new ObjectID(id) });
      if (pro === null)
        return res.status(400).send(response("id do not exist"));

      const newPro = await product.updateOne(
        { _id: new ObjectID(id) },
        { status: "inactive" }
      );
      return res.status(200).send(response("Product delete successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Product delete fail"));
    }
  },

  //update a product by id
  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const { categoryId, productName, productImage, quantity, price } =
        req.body;

      //Product validation
      if (!categoryId)
        return res.status(400).send(response("category ID is require!"));
      if (!productName)
        return res.status(400).send(response("product Name is require!"));
      if (!productImage)
        return res.status(400).send(response("product image is require!"));
      if (!quantity)
        return res.status(400).send(response("quantity is require!"));
      if (!price) return res.status(400).send(response("price is require!"));

      // find any existing data
      const pro = await product.findOne({ _id: new ObjectID(id) });
      if (pro === null)
        return res.status(400).send(response("id do not exist"));

      const updatePro = await product.updateOne(
        { _id: new ObjectID(id) },
        {
          categoriesId: categoryId,
          productName: productName,
          productImage: productImage,
          quantity: quantity,
          price: price,
        }
      );

      return res.status(200).send(response("Product update successful"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Product delete fail"));
    }
  },
  async searchProduct(req, res) {
    try {
      const id = req.params.id;
      const { categoryId, productName, productImage, quantity, price } =
        req.body;
      var check = 0;
      //Product validation
      if (!id) check++;
      if (!categoryId) check++;
      if (!productName) check++;
      if (!productImage) check++;
      if (!quantity) check++;
      if (!price) check++;
      if (check < 6) {
        const pro = await product.find({
          _id: new ObjectID(id),
          categoriesId: categoryId,
          productImage: productImage,
          price: price,
          productName:productName,
          quantity:quantity,
          status:"active"
        });

        return res.status(200).send(pro);
      }else{
        return res.status(400).send("please provide any name or anything else you want to search on product")
      }

      // find any existing data
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("Product delete fail"));
    }
  },
};
