import { PrismaClient } from "@prisma/client";
import { dbNow, StringToDate } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const findById = async (id) => {
    try {
        return await prisma.channelRoom.findUnique({
            where: {
                id,
            },
            include: {
                roomOwner: {
                    select: {
                        id: true,
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

export const findOpenRoomByChannelId = async (channelId) => {
    try {
        return await prisma.channelRoom.findMany({
            where: {
                channelId,
                status: "Open",
            },
            include: {
                roomParticipant: true,
                roomOwner: {
                    select: {
                        id: true,
                        nickname: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findReservedRoomByChannelId = async (channelId) => {
    try {
        return await prisma.channelRoom.findMany({
            where: {
                channelId,
                status: "Reservation",
            },
            include: {
                roomParticipant: true,
                roomOwner: {
                    select: {
                        id: true,
                        nickname: true,
                    },
                },
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

export const updateArchivedRoom = async (postId) => {
    try {
        return await prisma.channelRoom.updateMany({
            where: {
                postId,
            },
            data: {
                status: "Archived",
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findOwnerRoom = async (userId) => {
    try {
        let data = await prisma.channelRoom.findMany({
            where: {
                AND: [
                    {
                        userId,
                    },
                    {
                        status: {
                            not: "Archived",
                        },
                    },
                ],
            },
            orderBy: {
                status: "asc",
            },
            include: {
                roomOwner: true,
                channel: true,
                roomParticipant: true,
            },
        });
        data.map((v) => delete v["roomOwner"]["password"]);
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const findParticipantRoom = async (id) => {
    try {
        let data = await prisma.channelRoom.findMany({
            where: {
                AND: [
                    {
                        userId: {
                            not: id,
                        },
                    },
                    {
                        roomParticipant: {
                            some: {
                                userId: id,
                            },
                        },
                    },
                ],
            },
            orderBy: {
                status: "asc",
            },
            include: {
                roomOwner: true,
                channel: true,
                roomParticipant: true,
            },
        });
        data.map((v) => delete v["roomOwner"]["password"]);
        return data;
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
                status: "Close",
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

export const findOwnerCloseRoomByUserId = async (userId) => {
    try {
        let data = await prisma.channelRoom.findMany({
            where: {
                AND: [
                    {
                        userId,
                    },
                    {
                        status: "Close",
                    },
                ],
            },
            include: {
                roomOwner: true,
                channel: true,
            },
        });
        data.map((v) => delete v["roomOwner"]["password"]);
        return data;
    } catch (err) {
        console.error(err);
    }
};
