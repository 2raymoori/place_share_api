const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // email,password,image,
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    requied: true,
    default: "avatar",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", UserSchema);
