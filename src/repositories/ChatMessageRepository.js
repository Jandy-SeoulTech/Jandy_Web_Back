import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const createChannelMainChat = async (id, channelId, content) => {
    try {
        return await prisma.chatMessage.create({
            data: {
                channelId,
                sendUserId: id,
                content,
                createdAt: dbNow(),
            },
            include: {
                sendUser: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};
export const findChanelMainChatLastId = async (channelId, lastId) => {
    try {
        return await prisma.chatMessage.findMany({
            where: {
                AND: [
                    {
                        channelId,
                    },
                    {
                        id: {
                            lt: lastId,
                        },
                    },
                ],
            },
            orderBy: {
                id: "desc",
            },
        });
    } catch (err) {
        console.error(err);
    }
};
export const findChatByChannelId = async (channelId, lastId, limit) => {
    try {
        return await prisma.chatMessage.findMany({
            take: limit,
            where: {
                channelId,
            },
            cursor: lastId
                ? {
                      id: lastId,
                  }
                : undefined,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                sendUser: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findRoomChatLastId = async (roomId, lastId) => {
    try {
        return await prisma.chatMessage.findMany({
            where: {
                AND: [
                    {
                        channelRoomId: roomId,
                    },
                    {
                        id: {
                            lt: lastId,
                        },
                    },
                ],
            },
            orderBy: {
                id: "desc",
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findChatByRoomId = async (channelRoomId, lastId, limit) => {
    try {
        return await prisma.chatMessage.findMany({
            take: limit,
            where: {
                channelRoomId,
            },
            cursor: lastId
                ? {
                      id: lastId,
                  }
                : undefined,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                answeredMessage: {
                    include: {
                        sendUser: {
                            select: {
                                id: true,
                                email: true,
                                nickname: true,
                                profile: true,
                            },
                        },
                    },
                },
                sendUser: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createRoomChat = async (id, channelRoomId, content) => {
    try {
        return await prisma.chatMessage.create({
            data: {
                channelRoomId,
                sendUserId: id,
                content,
                createdAt: dbNow(),
            },
            include: {
                sendUser: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createRoomChatAnswer = async (
    id,
    channelRoomId,
    content,
    answeredId
) => {
    try {
        return await prisma.chatMessage.create({
            data: {
                channelRoomId,
                sendUserId: id,
                content,
                createdAt: dbNow(),
                answeredId,
            },
            include: {
                answeredMessage: {
                    include: {
                        sendUser: {
                            select: {
                                id: true,
                                email: true,
                                nickname: true,
                                profile: true,
                            },
                        },
                    },
                },
                sendUser: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findRoomAnswerChat = async (sendUserId, channelRoomId) => {
    try {
        let data = await prisma.chatMessage.findMany({
            where: {
                AND: [
                    {
                        sendUserId,
                    },
                    {
                        channelRoomId,
                    },
                    {
                        answeredId: {
                            not: null,
                        },
                    },
                ],
            },
            include: {
                answeredMessage: {
                    include: {
                        sendUser: true,
                    },
                },
                sendUser: true,
            },
        });
        return data.map((v) => {
            delete v.sendUser["password"];
            delete v.answeredMessage.sendUser["password"];
            return v;
        });
    } catch (err) {
        console.error(err);
    }
};
