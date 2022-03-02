const socket = io('http://localhost:8080');

const messagesContainer = document.getElementById('messagesContainer');
const usersList = document.getElementById('usersList');
const chatForm = document.getElementById('chatForm');
const textInput = document.getElementById('textInput');
const chatBtn = document.getElementById('chatBtn');
// const salirBtn = document.getElementById('salirBtn');

const redirectToLogin = () => {
    window.location = '/';
};

const renderMessage = (socketId, data) => {
    const div = document.createElement('div');
    let className;
    let html;
    if (data.id) {
        if(socketId === data.id) {
            className = 'myUser-messages';
            html = `
            <div id="myUser-message" class="myUser-message">
            <span><b>Yo:</b> ${data.time}:</span>
            <span>${data.text}</span>
            </div>`
        }else {
            className = 'otherUser-messages';
            html = `
            <div id="otherUser-message" class="otherUser-message">
            <span><b>${data.usename}:</b> ${data.time}:</span>
            <span>${data.text}</span>
            </div>`
        };
    }
    else {
        className = 'bot-messages';
        html = `<span><b>${data.usename} dice:</b> ${data.text}</span>`
    };
    div.classList.add(className);
    div.innerHTML = html;
    messagesContainer.appendChild(div)
}

//join chat - con QueryString voy a acceder al usuario.
const { username } = Qs.parse(window.location.search, {
    ignoreQueryPrefix: false
  });
  socket.emit('join-chat', { username });
socket.on('chat-message', (data) => {
    renderMessage(socket.id, data)
})
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = textInput.value;
    socket.emit('new-message', msg);
    textInput.value = "";
  });