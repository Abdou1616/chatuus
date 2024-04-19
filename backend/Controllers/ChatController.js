import chat from "../Models/Chat.js";

const createChat = async (req, res) => {
  try {
    const { message } = req.body;
    const savedMessage = await chat.create({ message });
    io.emit("chat message", savedMessage);
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createChat };
