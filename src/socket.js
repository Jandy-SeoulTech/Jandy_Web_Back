const SocketIO = require("socket.io");
import * as ChannelRoomRepository from "./repositories/ChannelRoomRepository";
import * as RoomUserRepository from "./repositories/RoomUserRepository";

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
    SocketServer.of(/^\.+/).on("connection", (socket) => {
        const newNamespace = socket.nsp;
        console.log("소켓 연결 성공");
        console.log(socket.id);
        console.log(socket.nsp.name);

        socket.on("join", async ({ roomId, user }) => {
            const response = await RoomUserRepository.findByRoomAndUserId(
                parseInt(roomId, 10),
                parseInt(user.id, 10)
            );
            if (!response) {
                await RoomUserRepository.joinRoomUser(roomId, userId);
            }

            newNamespace.emit(
                "joinUser",
                `${user.nickname} 님이 입장하셨습니다.`
            );

            const roomInfo = await ChannelRoomRepository.findById(
                parseInt(roomId, 10)
            );

            newNamespace.emit("RoomInfo", roomInfo);
        });

        socket.on("disconnect", () => {
            console.log("소켓 연결 종료");
        });
    });
};
