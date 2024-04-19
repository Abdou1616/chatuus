import mongoose from "mongoose";
const chatSchema = mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    requirred: true,
  },
});

const chat = mongoose.model("chat", chatSchema);

export default chat;
