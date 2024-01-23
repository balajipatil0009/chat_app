const socket = io()

let name = 'balaji'

const joinGroup = () =>{
    const msg = document.getElementById('msg').value;
   
    const to = document.getElementById('to').value
    console.log("name:"+ to+"msg:"+msg);
    apendMassage(msg, name, 'outgoing')
    socket.emit('room',{to, msg, from: name})
}