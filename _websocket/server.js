const Hapi = require('hapi');
const Setting = require('./settings');


const server = Hapi.server({
    port: Setting.PortServe,
    host: Setting.NameServe
});


var io = require("socket.io")(server.listener , {path: '/channel'});

io.on("connection", function (socket) {

    socket.on('subscribe', function(room) { 
        socket.join(room); 
        //console.log('joining room', io.nsps['/']);
        console.log('join room', socket.id);
    })

    socket.on('reconnect', function() { 
        //console.log('joining room', io.nsps['/']);
        console.log('Reconnect ', socket.id);
    })

    socket.on('setuserroom', function(roomid) {
        try
        {
            var numberRoom = io.sockets.adapter.rooms[roomid].length;
            //io.emit('getuserroom',numberRoom)
            io.sockets.in(roomid).emit('getuserroom',numberRoom)
        }
        catch (err)
        {
            console.log('Error : ', err);
        }
    })

    socket.on('disconnect', function() { 
        console.log('Leave room', socket.id);
    })

})

server.route({
    method: 'GET',
    path: '/topic-count/{idroom}',
    handler: (req, res) => {
        var idroom = req.params.idroom;
        
        if(io.nsps['/'].adapter.rooms[idroom].length !== 'undefined')
        {
            var chklen = io.nsps['/'].adapter.rooms[idroom].length;
            io.sockets.in(idroom).emit('message', { intnumber : chklen });
        }
        else
        {
            io.sockets.in(idroom).emit('message', { intnumber : 0 });
        }
        
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, reply) => {
        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

const init = async () => {
    await server.start();
    console.log('Server running at: ' + server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();