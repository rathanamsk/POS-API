const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Store = require("../models/store");
const { response } = require("../common/response");
const bcrypt = require("bcrypt");

module.exports = {
  async signup(req, res) {
    try {
      const {
        username,
        email,
        password,
        phoneNumber,
        storeName,
        storeLocation,
        storeImage,
      } = req.body;

      //user validation
      if (!username)
        return res.status(400).send(response("Username is require!"));
      if (!password)
        return res.status(400).send(response("Password is require!"));
      if (!email) return res.status(400).send(response("Email is require!"));
      if (!phoneNumber)
        return res.status(400).send(response("PhoneNumber is require!"));
      if (!storeName)
        return res.status(400).send(response("StoreName is require!"));
      if (!storeLocation)
        return res.status(400).send(response("Store location is require"));

      // find any existing data
      const user = await User.findOne({ email, phoneNumber });
      const store = await Store.findOne({ storeName });
      if (user) return res.status(400).send(response("User already exist"));
      if (store)
        return res.status(400).send(response("This store already token"));

      const newStore = await Store.create({
        storeImage,
        storeName,
        storeLocation,
      });
      const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(16));
      await User.create({
        storeId: newStore.id.toString(),
        username,
        email,
        password: hashPassword,
      });

      return res.status(200).send(response("successful signup"));
    } catch (err) {
        console.log(err);
        return res.status(500).send(response("fail to signup"))
    }
  },
};
