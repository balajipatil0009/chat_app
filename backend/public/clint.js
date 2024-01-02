const socket = io()


let name;
const authUser = (name) =>{
    console.log(name);
    socket.emit('auth',name);
}

let massageArea = document.getElementById('chat')

do{
     name = prompt("plz ender username")
     authUser(name)
}while(!name);

const priMSG = (tou, msg) =>{

}



const sendMassage=()=>{
   let textArea = document.getElementById('msg');
    let msg = {
        user : name,
        massage : textArea.value.trim()
    }
    const tou = "ramesh"
    apendMassage(msg, 'outgoing')
    socket.emit('privateMasssage',{to: 'ramesh', msg})
}
const apendMassage = (msg, type)=>{
      let mainDiv = document.createElement('div');
      mainDiv.classList.add(type)
      let markUp = `
      <h4 class='user'>${msg.user}</h4>
      <p>${msg.massage}</p>
      `
      mainDiv.innerHTML = markUp
      massageArea.appendChild(mainDiv);
}

socket.on('massage',(msg)=>{
    apendMassage(msg, 'incomming')
})
