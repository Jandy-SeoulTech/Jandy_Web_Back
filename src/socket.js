const SocketIO = require("socket.io");

const onlineUser = {};
export default (server, app) => {
    const SocketServer = SocketIO(server, {
        path: "/socket.io",
        cors: {
            origin: true,
            methods: ["GET", "POST"],
        },
        transport: { webSocket: true },
    });

    SocketServer.of(/^\/channel-.+/).on("connection", (socket) => {
        console.log("소켓 연결 성공");
        console.log(socket.id);
        console.log(socket.nsp.name);
        const newNamespace = socket.nsp;

        //onlineUser에 namespace 단위로 관리.
        if (!onlineUser[socket.nsp.name]) {
            onlineUser[socket.nsp.name] = {};
        }
        socket.emit("hello", socket.nsp.name);
        socket.on("join", (data) => {
            console.log(data.userdata);
            onlineUser[socket.nsp.name][socket.id] = {
                id: data.userdata.id,
                name: data.userdata.name,
            };
            newNamespace.emit(
                "onlineList",
                Object.values(onlineUser[socket.nsp.name])
            );
        });

        socket.on("disconnect", () => {
            console.log("소켓 연결 종료");
            delete onlineUser[socket.nsp.name][socket.id];
            newNamespace.emit(
                "onlineList",
                Object.values(onlineUser[socket.nsp.name])
            );
        });
    });
};
