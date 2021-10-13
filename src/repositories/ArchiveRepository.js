import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createArchive = async (data) => {
    try {
        return prisma.archive.create({ data });
    } catch (err) {
        console.error(err);
    }
};

export const deleteArchive = async (id) => {
    try {
        return await prisma.archive.delete({
            where: { id },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateArchive = async (id, data) => {
    try {
        await prisma.archive.update({
            where: {
                id: id,
            },
            data: {
                images: {
                    deleteMany: {},
                },
            },
        });
        return await prisma.archive.update({
            where: { id },
            data,
            include: {
                images: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const getArchiveById = async (id) => {
    try {
        return prisma.archive.findUnique({
            where: { id },
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
                post: {
                    select: {
                        title: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                        author: {
                            select: {
                                id: true,
                                email: true,
                                nickname: true,
                                profile: true,
                            },
                        },
                    },
                },
                archiveLike: {
                    select: {
                        userId: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
                images: {
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

export const getArchiveListByChannelId = async (channelId, isPublic) => {
    const status = isPublic ? "Public" : undefined;
    try {
        return prisma.archive.findMany({
            where: {
                channelId,
                status,
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
                post: {
                    select: {
                        title: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                        author: {
                            select: {
                                id: true,
                                email: true,
                                nickname: true,
                                profile: true,
                            },
                        },
                    },
                },
                images: {
                    select: {
                        src: true,
                    },
                },
                archiveLike: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const getArchiveListByUserId = async (userId, isPublic) => {
    try {
        const status = isPublic ? "Public" : undefined;
        return prisma.archive.findMany({
            where: {
                ownerId: userId,
                status,
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
                post: {
                    select: {
                        title: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                        author: {
                            select: {
                                id: true,
                                email: true,
                                nickname: true,
                                profile: true,
                            },
                        },
                    },
                },
                images: {
                    select: {
                        src: true,
                    },
                },
                archiveLike: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByKeyword = async (keyword, skip, take) => {
    try {
        return await prisma.archive.findMany({
            skip,
            take,
            where: {
                AND: [
                    {
                        title: {
                            contains: keyword,
                        },
                    },
                    {
                        status: {
                            equals: "Public",
                        },
                    },
                ],
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
                post: {
                    select: {
                        title: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                        author: {
                            select: {
                                id: true,
                                email: true,
                                nickname: true,
                                profile: true,
                            },
                        },
                    },
                },
                images: {
                    select: {
                        src: true,
                    },
                },
                archiveLike: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
