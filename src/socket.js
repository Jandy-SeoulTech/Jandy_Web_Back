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
    SocketServer.of(/^\/.+/).on("connection", (socket) => {
        const newNamespace = socket.nsp;
        console.log("소켓 연결 성공");
        console.log(socket.id);
        console.log(socket.nsp.name);

        socket.on("join", async ({ roomId, user }) => {
            console.log("다른 유저 접속 성공");
            const response = await RoomUserRepository.findOneByRoomAndUserId(
                parseInt(roomId, 10),
                parseInt(user.id, 10)
            );
            if (!response) {
                await RoomUserRepository.joinRoomUser(
                    parseInt(roomId, 10),
                    parseInt(user.id, 10)
                );
                newNamespace.emit(
                    "joinUser",
                    `${user.nickname} 님이 입장하셨습니다.`
                );
            }

            const participantInfo = await RoomUserRepository.findManyByRoomId(
                parseInt(roomId, 10)
            );

            newNamespace.emit("RoomInfo", participantInfo);
        });

        socket.on("disconnect", () => {
            console.log("소켓 연결 종료");
        });
    });
};
