const socket = io()
let user
const chatBox = document.getElementById('chatBox')


Swal.fire({
    icon: 'info',
    title: 'Ingresa tu nombre',
    input:'text',
    text: 'Ingresa tu nombre para poder identificarte en el chat',
    inputValidator: (v)=> {
        if(!v) {
            return 'Identificate para continuar'
        } 
        else {
            socket.emit('userConnected', {user: user})
        }
    },
    allowOutsideClick: false,


}).then(result => {
    user = result.value
    const userName = document.getElementById('myName')
    userName.innerHTML = user;
})

chatBox.addEventListener('keyup', e => {
    if(e.key === 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {user: user, message: chatBox.value})
            chatBox.value = ''
        }
    }
})


socket.on('chatLogs', data=> {
    const chatLog = document.getElementById('chatLog')
    let logs = ''
    data.forEach(log => {
        logs += `${log.user} dice: ${log.message}</br>`
    });

    chatLog.innerHTML = logs
})

socket.on('userConnected', data => {
    let mensaje = `Se conecto ${data.user}`
    Swal.fire ({
        icon: 'info',
        text: mensaje,
        toast: true,
    })
})



const closeChat = document.getElementById('closeChat')

closeChat.addEventListener('click', e => {
    const chatLog = document.getElementById('chatLog')
    socket.emit('closeChat', {close: 'close'})
    chatLog.innerHTML = ''
})
