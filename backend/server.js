const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const messageRoutes =require("./routes/messageRoutes");
const {notFound,errorHandler} =require('./middlewares/errorMiddleware');
// const { registerUser, authUser,allUsers } = require('./controllers/userControllers');
const path = require("path");
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("./controllers/chatControllers");

// const {notFound,errorHandler} =require('./middlewares/authMiddleware');


dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept jason data


// app.get("/",(req,res)=>{
//     res.send("API is Running");
// });

// app.post("/api/user/login",authUser);
// app.get("/api/user", allUsers);
// app.post("/api/user",registerUser);


//  app.post('/api/chat/', accessChat);
//  app.post('/api/chat/', fetchChats);
//  app.post('/api/chat/group', createGroupChat);
// app.put('/api/chat/rename', renameGroup);
//  app.put('/api/chat/groupremove', removeFromGroup);
//  app.put('/api/chat/groupadd', addToGroup);

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "productions") {
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

const PORT =process.env.PORT || 3000;
const server=app.listen(3000, console.log(`Server srtart on PORT ${PORT}`));

const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    }
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
   socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
});
});
