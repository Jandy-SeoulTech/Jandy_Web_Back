import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
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
                    },
                },
                participants: {
                    select: {
                        userId: true,
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
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findManyByUserid = async (id) => {
    try {
        return await prisma.channel.findMany({
            where: {
                adminId: id,
            },
            include: {
                admin: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                    },
                },
                participants: {
                    select: {
                        userId: true,
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
