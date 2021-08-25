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
    app.set("io", SocketServer);
    SocketServer.of(/^\/channel-.+/).on("connection", (socket) => {
        console.log("소켓 연결 성공");
        console.log(socket.id);
        console.log(socket.nsp.name);
        const newNamespace = socket.nsp;

        socket.on("disconnect", () => {
            console.log("소켓 연결 종료");
        });
    });
};
