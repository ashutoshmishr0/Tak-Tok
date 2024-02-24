const asyncHandler=require("express-async-handler");
const Chat =require("../models/chatModel"); 
const User = require("../Models/userModel");


const accessChat =asyncHandler(async(req,res)=>{
      const {userId} =req.body;

      if(!userId){
        console.log("UserId prams not send with request");
        return res.sendStatus(400);
      }

      var isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch: {$eq:req.user._id}}},
            {users:{$elemMatch: {$eq:userId}}},
        ],
      }).populate("users","-password")
       .populate("latestMessage");

       isChat=await User.populate(isChat,{
        path: "latestMessage.sender",
        select:" name pic email",
       });
      
       if(isChat.length > 0){
        res.send(isChat[0]);
       } else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        };

        try {
            const createdChat =await Chat.create(chatData);

            const FullChat=await Chat.findOne({_id:createdChat._id}).populate(
                "users",
                "-password"
                );
                res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }

       }
});

const fetchChats=asyncHandler(async(req,res)=>{
  try {
    Chat.find({user:{$elemMatch: {$eq:req.user._id}}})
    .populate("users","-password")
    .populate("groupAdmin","-password")
    .populate("latestMessage")
    .sort({ updatedAt:-1})
    .then(async (results)=>{
        results=await User.populate(results,{
          path:"latestMessage.sender",
          select:"name pic email",
        });
        res.status(200).send(results);
    });

  } catch (error) {
    res.status(400);
    throw new Error(error.massage);
  }
});

const createGroupChat =asyncHandler(async (req,res)=>{
  if(!req.body.users || !req.body.name){
    return res.status(400).send({massage:"plese fill all fields "});
  }

  var users =JSON.parse(req.body.users);

  if(users.length<2){
    return res
    .status(400)
    .send("More than 2 user are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName :req.body.name,
      users:users,
      isGroupChat:true,
      groupAdmin:req.user,
    });

    const fullGroupChat=await Chat.findOne({_id: groupChat._id})
     .populate("users","-password")
     .populate("groupAdmin","-password");

     res.status(200).json(fullGroupChat);
  } catch (error) {
     res.status(400);
    throw new Error(error.massage);
  }
})

const renameGroup=asyncHandler(async (req,res)=>{
  const {chatId,chatName}=req.body;

  const updatedChat =await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new:true,
    }
  )
  .populate("users","-password")
  .populate("groupAdmin","-password");

  if(!updatedChat){
    res.status(404);
    throw new Error("Chat Not Found");
  }
  else{
    res.json(updatedChat);
  }
})

const addToGroup=asyncHandler(async (req,res)=>{
  const{ chatId,userId}=req.body;

  const added=await chat.findByIdAndUpdate(
    chatId,{
      $push:{user:userId},     
    },
    {new:true}
  )
  .populate("users","-password")
  .populate("groupAdmin","-password");

  if(!added){
    res.status(404);
    throw new Error("Chat not found");
  }
  else{
    res.json(added);
  }

})

const removeFromGroup=asyncHandler(async (req,res)=>{
  const{ chatId,userId}=req.body;

  const removed=await chat.findByIdAndUpdate(
    chatId,{
      $pull:{user:userId},     
    },
    {new:true}
  )
  .populate("users","-password")
  .populate("groupAdmin","-password");

  if(!remove){
    res.status(404);
    throw new Error("Chat not found");
  }
  else{
    res.json(remove);
  }

})

module.exports={accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup};