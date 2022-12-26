const User = require("../../models/user");
const Store = require("../../models/store");
const enumType = require("../../common/enum");
const { response } = require("../../common/response");
const { uploadProfileImage } = require("../../common/uploadImage");
const bcrypt = require("bcrypt");
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
      return res.status(200).send(response("successful get user", user));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("fail to get user"));
    }
  },

  async getStore(req,res) {
    try{
      const storeId = req.auth.storeId
      const store = await Store.findById(storeId)
      if (!store) {
        return res.status(400).send(response("store not found"));
      }
      return res.status(200).send(response("successful get store", store))
    }catch(err) {
      console.log(err);
      return res.status(500).send(response("fail to get store"));
    }
  },

  async updateProfile(req, res) {
    try {
      const { username, phoneNumber } = req.body;
      if (req.file) {
        var profile = await uploadProfileImage(res, "profile", req.file);
      }
      const userId = req.auth.id;
      await User.updateOne({ userId }, { username, profile, phoneNumber });
      return res.status(200).send(response("successful update user"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("fail to update profile"));
    }
  },

  async updateStore(req, res) {
    try {
      const { storeName, storeLocation } = req.body;
      if (req.file) {
        var storeImage = await uploadProfileImage(res, "profile", req.file);
      }
      const storeId = req.auth.storeId;
      await Store.updateOne(
        { storeId },
        { storeName, storeLocation, storeImage }
      );
      return res.status(200).send(response("successful update store"));
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("fail to update profile"));
    }
  },

  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword) {
        return res.status(400).send(response("current password is require"));
      }
      if (!newPassword) {
        return res.status(400).send(response("new password is require"));
      }
      const userId = req.auth.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).send(response("user not found"));
      }
      const comparePassword = await bcrypt.compare(currentPassword, user.password)
      if (!comparePassword) {
        return res.status(400).send(response('current password incorrect'))
      }
      if (currentPassword === newPassword) {
        return res.status(400).send(response('current password can not same as new password'))
      }

      const hashPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt())
      await User.updateOne({ userId },{ password: hashPassword })

      return res.status(200).send(response('successful change password'))
    } catch (err) {
      console.log(err);
      return res.status(500).send(response("fail to change password"));
    }
  },
};
