const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '1046906',
    key: '77e38043d1e93b4e888f',
    secret: '7d37bb7e90a463353b1c',
    cluster: 'ap2',
    encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/message/send', (req, res) => {
    pusher.trigger( 'private-reactchat', 'messages', {
        message: req.body.message,
        username: req.body.username
    });
    res.sendStatus(200);
});

app.post('/pusher/auth', (req, res) => {
    console.log('POST to /pusher/auth');
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
