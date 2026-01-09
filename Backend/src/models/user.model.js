import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false }  
});

userSchema.methods.comparePassword = async function(enteredPassword) {
  return this.password === enteredPassword;
}


const User = mongoose.model("User", userSchema);

export default User;
