const socket = io();

const messagesContainer = document.getElementById('messagesContainer')

socket.on('messages', (data) => {
    console.log(data)
    const dataMessage = data.map(message => {
        let fragment = `<span><b>${message.author}</b>: ${message.text}</span><br>`
        return fragment
    }).join(' ')
    messagesContainer.innerHTML = dataMessage
})