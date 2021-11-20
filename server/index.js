const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;
const FormatMessage = require('./utils/usermessage')
const { userJoin, getCurrentUser } = require('./utils/users')
const path = require('path')
app.use('/', express.static(path.join(__dirname, 'public')))
const mongoose = require('mongoose')
const URI = 'mongodb+srv://sid141:Sid1412@cluster0.qrqhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const router = require('./routes/message')

app.use(express.json())


mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => {
        io.on('connection', (socket) => {

            socket.on('joinRoom', ({ username, room }) => {

                //join room based on the data
                const user = userJoin(socket.id, username, room);
                socket.join(user.room);

                //send welcome mssg to the user
                socket.emit('notify message', FormatMessage('admin', `You have joined the room ${user.room}`))

                //send msg to the users when user connects
                socket.broadcast.to(user.room).emit('notify message', FormatMessage('admin', `${user.username} has joined the room ${user.room}`))

                //send msgs to room
                socket.on('chat message', (msg) => {
                    io.to(user.room).emit('chat message', { msg, username });
                });
                socket.on('disconnect', () => {
                    io.to(user.room).emit('notify message', FormatMessage('admin', `${user.username} has disconnected`))
                })
            })



        });

        app.use('/messages', router)

        server.listen(PORT, () => console.log(`server started on port ${PORT}`))
    })
    .catch(err => console.log(err))

