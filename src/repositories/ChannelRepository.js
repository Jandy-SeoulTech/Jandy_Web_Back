import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const createChannel = async (option) => {
    try {
        return await prisma.channel.create({
            data: option,
        });
    } catch (err) {
        console.error(err);
    }
};

export const findById = async (id) => {
    try {
        return await prisma.channel.findUnique({
            where: { id },
            include: {
                admin: {
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
                participants: {
                    select: {
                        userId: true,
                        user: {
                            select: {
                                id: true,
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
                category: {
                    include: {
                        category: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
                channellike: {
                    select: {
                        userId: true,
                    },
                },
                ban: {
                    select: {
                        userId: true,
                    },
                },
                channelImage: {
                    select: {
                        src: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateChannel = async (data) => {
    try {
        await prisma.channel.update({
            where: {
                id: parseInt(data.id, 10),
            },
            data: {
                tags: {
                    deleteMany: {},
                },
            },
        });
        await prisma.channel.update({
            where: { id: parseInt(data.id, 10) },
            data,
        });
        return true;
    } catch (err) {
        console.error(err);
    }
};

export const findAdminChannel = async (id, SelectOption) => {
    try {
        return await prisma.channel.findMany({
            where: {
                adminId: id,
            },
            select: SelectOption,
        });
    } catch (err) {
        console.error(err);
    }
};

export const findParticipantUser = async (id) => {
    try {
        return await prisma.channel.findMany({
            where: {
                participants: {
                    some: {
                        userId: id,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findParticipantChannel = async (id, SelectOption) => {
    try {
        return await prisma.channel.findMany({
            where: {
                participants: {
                    some: {
                        userId: id,
                    },
                },
            },
            select: SelectOption,
        });
    } catch (err) {
        console.error(err);
    }
};

export const findChatLogById = async (id) => {
    try {
        return await prisma.channel.findUnique({
            where: {
                id,
            },
            select: {
                baseRoomChat: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createChat = async (id, channelId, content) => {
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

export const findChatByChannelId = async (channelId, lastId) => {
    try {
        return await prisma.chatMessage.findMany({
            take: 10,
            where: {
                channelId,
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
