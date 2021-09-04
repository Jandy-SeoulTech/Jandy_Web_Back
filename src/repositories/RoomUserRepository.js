import { PrismaClient } from "@prisma/client";
import { dbNow, StringToDate } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const findOneByRoomAndUserId = async (channelRoomId, userId) => {
    try {
        return await prisma.roomUser.findUnique({
            where: {
                RoomUser: {
                    channelRoomId,
                    userId,
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const joinRoomUser = async (channelRoomId, userId) => {
    try {
        return await prisma.roomUser.create({
            data: {
                channelRoomId,
                userId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findManyByRoomId = async (channelRoomId) => {
    try {
        return await prisma.roomUser.findMany({
            where: {
                OR: [
                    {
                        status: "Owner",
                    },
                    {
                        status: "active",
                    },
                ],
                AND: {
                    channelRoomId,
                },
            },
            orderBy: {
                status: "desc",
            },
            select: {
                status: true,
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
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateOneStatus = async (channelRoomId, userId) => {
    try {
        return await prisma.roomUser.update({
            where: {
                RoomUser: {
                    channelRoomId,
                    userId,
                },
            },
            data: {
                status: "inactive",
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const deleteOne = async (channelRoomId, userId) => {
    try {
        return await prisma.roomUser.delete({
            where: {
                RoomUser: {
                    channelRoomId,
                    userId,
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByExUser = async (channelRoomId) => {
    try {
        return await prisma.roomUser.findMany({
            where: {
                OR: [
                    {
                        status: "inactive",
                    },
                    {
                        status: "active",
                    },
                ],
                AND: {
                    channelRoomId,
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findReviewStatus = async (channelRoomId, userId) => {
    try {
        return await prisma.roomUser.findMany({
            where: {
                AND: [
                    {
                        RoomUser: {
                            channelRoomId,
                            userId,
                        },
                    },
                    {
                        status: "inactive",
                    },
                ],
            },
        });
    } catch (err) {
        console.error(err);
    }
};
