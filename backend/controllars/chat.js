const User = require('../db/schemas/userSchema');
const chats = require('../db/schemas/chatsSchema');
const admin = require('firebase-admin');

const chat = async (Socket) => {
  // console.log("conected...."+JSON.stringify(Socket.id))

  Socket.emit('welcome');

  Socket.on('auth', async (userId) => {
    console.log(`new user joined with ${userId}`);
    // const collection = db.collection(balaji);
    try {
      //   //store  user with new socket id
      console.log(userId + ': ' + Socket.id);

      const userExist = await User.findOne({ userId: userId });
      if (userExist) {
        //     //  console.log(`user Exist : ${userExist._id}`)
        const _id = userExist._id;
        try {
          const updateSocket = await User.findByIdAndUpdate(
            _id,
            { socketId: Socket.id },
            { new: true }
          );
          if (updateSocket) {
            console.log('socket updated');
          }
          const chat = await chats.find({ members: { $in: [userId] } });
          if (chat) {
            // console.log('USERID:' + userId + chat);
            Socket.emit('priviousChats', chat);
          } else {
            console.log('no chats');
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log('catch:' + e);
    }
  });

  Socket.on('massage', async (data) => {
    console.log(data);
    Socket.broadcast.emit('massage', data);
  });

  //to just have user id
  Socket.on('privateMasssage', async ({ to, msg, from }) => {
    console.log(to + ': ' + msg);
    const user = await User.findOne({ userId: to });
    const toUser = user.socketId;
    console.log(toUser);
    if (toUser) {
      Socket.to(toUser).emit('privateMasssage', { msg, from, to });
      const users = [to, from];
      const authChats = await chats.findOne({
        members: { $all: users, $size: users.length },
      }); //to check the users of chat
      if (authChats) {
        const newChat = { from, to, msg };
        await chats.findByIdAndUpdate(
          { _id: authChats._id },
          { $push: { chats: newChat } },
          { new: true }
        );
      } else {
        const newChat = new chats({
          members: [to, from],
          chats: [
            {
              from,
              to,
              msg,
            },
          ],
        });
        try {
          newChat.save().then(() => {
            console.log('chat saved');
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  });
  Socket.on('join', async ({ room }) => {
    Socket.join(room);
    Socket.room = room;
    console.log(`user joined to ${room} user : ${Socket.id}`);
  });

  Socket.on('room', async ({ room, from, msg }) => {
    console.log(room + from);
    Socket.to(room).emit('massage', { from: from, msg: msg });
  });
};

module.exports = chat;
