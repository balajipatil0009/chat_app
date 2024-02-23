const socket = io();
let name = '';
const authUser = (name) => {
  console.log(name);
  socket.emit('auth', name);
};

let massageArea = document.getElementById('chat');

do {
  name = prompt('plz ender username');
  authUser(name);
  socket.emit('userNM', { userNM: name });
} while (!name);

const priMSG = (tou, msg) => {};

const sendMassage = () => {
  const msg = document.getElementById('msg').value;

  const to = document.getElementById('to').value;
  console.log('name:' + to + 'msg:' + msg);
  apendMassage(msg, name, 'outgoing');
  socket.emit('privateMasssage', { to, msg, from: name });
};
const apendMassage = (msg, from, type) => {
  let mainDiv = document.createElement('div');
  mainDiv.classList.add(type);
  let markUp = `
      <h4 class='user'>${from}</h4>
      <p>${msg}</p>
      `;
  mainDiv.innerHTML = markUp;
  massageArea.appendChild(mainDiv);
};

socket.on('massage', ({ msg, from }) => {
  apendMassage(msg, from, 'incomming');
});

socket.on('priviousChats', (chats) => {
  chats.map((chat) => {
    if (chat.from != name) {
      apendMassage(chat.msg, chat.from, 'incomming');
    } else {
      apendMassage(chat.msg, name, 'outgoing');
    }
  });
});

const joinGroup = () => {
  const room = document.getElementById('to').value;
  console.log('name:' + to + 'msg:' + msg);
  socket.emit('join', { room });
};
const msgGroup = () => {
  const msg = document.getElementById('msg').value;

  const room = document.getElementById('to').value;
  console.log('name:' + to + 'msg:' + msg);
  apendMassage(msg, name, 'outgoing');
  socket.emit('room', { room, msg, from: name });
};
