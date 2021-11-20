const form = document.getElementById('form');
const input = document.getElementById('input');
const socket = io();
const submit = document.getElementById('submit');
const uname = document.getElementById('username');
const uroom = document.getElementById('room');
const chatRoom = document.getElementById('chat-room');
const modal = document.getElementById('modal');
const secondhalf = document.getElementById('secondhalf');


// get data from uri
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const room = urlParams.get('room');


socket.emit('joinRoom', { username, room })


//joining users
if (submit) {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        if (uname.value || uroom.value) {
            window.location.href = `/chat.html?username=${uname.value}&room=${uroom.value}`;
        }
    })

}

socket.on('notify message', (msg) => {

    const modalView = document.createElement('div')
    modalView.className = 'modalView'
    modalView.innerHTML = `<p class="modalText">${msg.username} : ${msg.text}</p>`
    modal.appendChild(modalView)
    secondhalf.scrollTop = secondhalf.scrollHeight;

})



if (form) {
    //chat messages
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
            input.focus()
        }
    })

}


document.getElementById('room-name').innerHTML = `Room : ${room}`


socket.on('chat message', (msg) => {
    let msgCont = document.createElement('div');
    msgCont.className = 'chat-msg-cont';
    msgCont.innerHTML = `<p class="username">${msg.username}</p>
    <div class="chat-msg">
        <p class="msg">${msg.msg}</p>
    </div>`;
    document.getElementsByClassName('chat-room')[0].appendChild(msgCont)
    chatRoom.scrollTop = chatRoom.scrollHeight;
})

if (chatRoom.offsetHeight) {
    console.log('hi')
} else {
    console.log('hisad')
}