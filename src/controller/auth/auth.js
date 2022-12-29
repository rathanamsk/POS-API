const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Store = require("../../models/store");
const UserSession = require("../../models/userSession");
const { response } = require("../../common/response");
const bcrypt = require("bcrypt");
const enumType = require("../../common/enum");

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
      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
        return res.status(400).send(response("Please give a valid email!"));
      if (!email) return res.status(400).send(response("Email is require!"));
      if (!phoneNumber)
        return res.status(400).send(response("PhoneNumber is require!"));
      if (!storeName)
        return res.status(400).send(response("StoreName is require!"));
      if (!storeLocation)
        return res.status(400).send(response("Store location is require"));

      // find any existing data
      const emailUser = await User.findOne({ email });
      const phoneNumberUser = await User.findOne({ phoneNumber });
      const store = await Store.findOne({ storeName });
      if (emailUser)
        return res.status(400).send(response("User email already exist"));
      if (phoneNumberUser)
        return res
          .status(400)
          .send(response("User phone number already exist"));
      if (store)
        return res.status(400).send(response("This store already token"));

      const newStore = await Store.create({
        storeImage,
        storeName,
        storeLocation,
      });
      const hashPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(16)
      );
      const user = await User.create({
        storeId: newStore.id.toString(),
        username,
        email,
        phoneNumber,
        role: enumType.userRole.ADMIN,
        password: hashPassword,
      });
      const payload = {
        email,
        id: user.id,
        phoneNumber: user.phoneNumber,
        storeId: user.storeId,
        role: user.role,
      };
      
      const token = await jwt.sign(payload, process.env.JWT_SECRET)

      return res.status(200).send(response("successful signup", token));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("fail to signup"));
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) return res.status(400).send(response("Email is require"));
      if (!password)
        return res.status(400).send(response("Password is require!"));
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send(response("User not found"));
      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send(response("Password invalid"));
      const payload = {
        email,
        id: user.id,
        phoneNumber: user.phoneNumber,
        storeId: user.storeId,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      await UserSession.create({
        userId: user.id,
        token: token,
        status: enumType.loginStatus.ACTIVE,
      });
      return res.status(200).send(response("Successful login", token));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("fail to login"));
    }
  },

  async logout(req, res) {
    try {
      const token = req.get("authorization").split(" ")[1];
      if (!token) return res.status(400).send(response("token not found"));
      await UserSession.deleteOne({ token });
      return res.status(200).send(response("successful logout"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("fail to logout"));
    }
  },
};
