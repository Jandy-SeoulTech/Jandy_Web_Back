import { PrismaClient } from "@prisma/client";
import { dbNow, StringToDate } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const findById = async (id) => {
    try {
        return await prisma.channelRoom.findUnique({
            where: {
                id,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const CreateRoom = async (bodyData, userId) => {
    try {
        return await prisma.channelRoom.create({
            data: {
                status: bodyData.status,
                name: bodyData.name,
                channelId: parseInt(bodyData.channelId, 10),
                postId: parseInt(bodyData.postId, 10),
                createdAt: dbNow(),
                userId,
                roomParticipant: {
                    create: {
                        userId,
                        status: "Owner",
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const ReserveRoom = async (bodyData, userId) => {
    try {
        return await prisma.channelRoom.create({
            data: {
                status: bodyData.status,
                name: bodyData.name,
                channelId: parseInt(bodyData.channelId, 10),
                postId: parseInt(bodyData.postId, 10),
                createdAt: dbNow(),
                reservedAt: StringToDate(bodyData.reservedTime),
                userId,
                roomParticipant: {
                    create: {
                        userId,
                        status: "Owner",
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByChannelId = async (channelId) => {
    try {
        return await prisma.channelRoom.findMany({
            where: {
                channelId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateOpenRoom = async (id) => {
    try {
        return await prisma.channelRoom.update({
            where: {
                id,
            },
            data: {
                status: "Open",
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const CheckParticipantRoom = async (id) => {
    try {
        return await prisma.channelRoom.findMany({
            where: {
                roomParticipant: {
                    every: {
                        userId: id,
                    },
                },
            },
            select: {
                id: true,
                status: true,
                name: true,
                createdAt: true,
                roomOwner: {
                    select: {
                        email: true,
                        nickname: true,
                    },
                },
                roomParticipant: true,
                channel: {
                    select: {
                        name: true,
                        channelImage: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findChatByRoomId = async (channelRoomId, lastId) => {
    try {
        return await prisma.chatMessage.findMany({
            take: 10,
            where: {
                channelRoomId,
            },
            cursor: lastId
                ? {
                      id: lastId - 1,
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
                                profile: {
                                    select: {
                                        profileImage: {
                                            select: {
                                                src: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                sendUser: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: {
                            select: {
                                profileImage: {
                                    select: {
                                        src: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createChat = async (id, channelRoomId, content) => {
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
                        profile: {
                            select: {
                                profileImage: {
                                    select: {
                                        src: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createChatAnswer = async (
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
                                profile: {
                                    select: {
                                        profileImage: {
                                            select: {
                                                src: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                sendUser: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: {
                            select: {
                                profileImage: {
                                    select: {
                                        src: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateCloseRoom = async (id) => {
    try {
        return await prisma.channelRoom.update({
            where: {
                id,
            },
            data: {
                status: "close",
                roomParticipant: {
                    updateMany: {
                        where: {
                            status: "active",
                        },
                        data: {
                            status: "inactive",
                        },
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByUserId = async (userId) => {
    try {
        return await prisma.channelRoom.findMany({
            where: {
                userId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const deleteRoom = async (id) => {
    try {
        return await prisma.channelRoom.delete({
            where: {
                id,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
