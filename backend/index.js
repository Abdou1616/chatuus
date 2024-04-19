import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import ChatRoute from "./Routes/ChatRoute.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());

app.use("/api", ChatRoute);

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
