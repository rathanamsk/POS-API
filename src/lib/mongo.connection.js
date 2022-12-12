const mongoose = require("mongoose");

module.exports = async () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('db connection is initialize!!');
  })
}
