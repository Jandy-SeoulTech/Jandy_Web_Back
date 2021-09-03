import { PrismaClient } from "@prisma/client";
import { dbNow, StringToDate } from "../utils/dayUtils";

const prisma = new PrismaClient();

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

export const findById = async (id) => {
    try {
        return await prisma.channelRoom.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                status: true,
                name: true,
                channelId: true,
                roomOwner: {
                    select: {
                        nickname: true,
                        email: true,
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
                roomParticipant: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
