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
                                profileImage: true,
                                wellTalent: {
                                    select: {
                                        contents: true,
                                    },
                                },
                                interestTalent: {
                                    select: {
                                        contents: true,
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
                                        profileImage: true,
                                        wellTalent: {
                                            select: {
                                                contents: true,
                                            },
                                        },
                                        interestTalent: {
                                            select: {
                                                contents: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
                channelLike: {
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

export const findByKeyword = async (category, keyword, skip, take) => {
    try {
        const whereQuery = {
            OR: [
                {
                    name: {
                        contains: keyword,
                    },
                },
                {
                    tags: {
                        some: {
                            tag: {
                                name: {
                                    contains: keyword,
                                },
                            },
                        },
                    },
                },
            ],
            AND: [
                {
                    category: {
                        code: {
                            in: category,
                        },
                    },
                },
            ],
        };
        const query = {
            skip,
            take,
            where: whereQuery,
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            include: {
                admin: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: {
                            select: {
                                profileImage: true,
                                wellTalent: {
                                    select: {
                                        contents: true,
                                    },
                                },
                                interestTalent: {
                                    select: {
                                        contents: true,
                                    },
                                },
                            },
                        },
                    },
                },
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
                participants: {
                    select: {
                        userId: true,
                    },
                },
            },
        };
        const channels = await prisma.channel.findMany(query);
        const totalCount = await prisma.channel.count({
            where: whereQuery,
        });
        return {
            channels,
            totalCount,
        };
    } catch (err) {
        console.error(err);
    }
};
