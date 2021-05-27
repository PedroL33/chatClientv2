import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String},
  password: {type: String},
  online: {type: Boolean, default: false},
  status: {type: String, default: ""},
  image: {type: String, default: ""}
})

export const User = mongoose.model("User", UserSchema);