const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const {notFound,errorHandler} =require('./middlewares/errorMiddleware');
// const {notFound,errorHandler} =require('./middlewares/authMiddleware');


dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept jason data


app.get("/",(req,res)=>{
    res.send("API is Running");
});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT =process.env.PORT || 5000;
app.listen(5000, console.log(`Server srtart on PORT ${PORT}`));