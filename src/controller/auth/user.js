const User = require("../../models/user");
const enumType = require("../../common/enum");
const { response } = require("../../common/response");
module.exports = {
  async createUser(req, res) {
    try {
      const { email, username, phoneNumber, password } = req.body;
      if (!username)
        return res.status(400).send(response("Username is require!"));
      if (!password)
        return res.status(400).send(response("Password is require!"));
      if (!email) return res.status(400).send(response("Email is require!"));
      if (!phoneNumber)
        return res.status(400).send(response("PhoneNumber is require!"));

      const emailUser = await User.findOne({ email });
      const phoneNumberUser = await User.findOne({ phoneNumber });
      if (emailUser)
        return res.status(400).send(response("User email already exist"));
      if (phoneNumberUser)
        return res
          .status(400)
          .send(response("User phone number already exist"));

      await User.create({
        storeId: req.auth.storeId,
        username,
        email,
        phoneNumber,
        role: enumType.userRole.MODERATOR,
        createdBy: req.auth.id,
      });

      return res.status(200).send(response("successful create user"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("fail to create user"));
    }
  },

  async getUser(req, res) {
    try {
      const id = req.auth.id;
      const user = await User.findOne({ id }, ["-password"]);
      if (!user) return res.status(400).send(response("user not found"));
      return res.status(200).send(response('successful get user', user))
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("fail to get user"));
    }
  },
};
