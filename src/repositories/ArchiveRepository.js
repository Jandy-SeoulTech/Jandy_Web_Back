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

export const getArchiveListByChannelId = async (
    channelId,
    isPublic,
    page,
    pageSize
) => {
    const status = isPublic ? "Public" : undefined;
    try {
        const whereQuery = {
            channelId,
            status,
        };
        const query = {
            where: whereQuery,
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            skip: (page - 1) * pageSize,
            take: pageSize,
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
        };
        const archives = await prisma.archive.findMany(query);
        const totalPage =
            parseInt(
                (await prisma.archive.count({
                    where: whereQuery,
                })) / pageSize
            ) + 1;
        return {
            archives,
            totalPage,
        };
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
        const whereQuery = {
            OR: [
                {
                    title: {
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
                    status: {
                        equals: "Public",
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
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        };
        const archives = prisma.archive.findMany(query);
        const totalCount = prisma.archive.count({
            where: whereQuery,
        });
        return {
            archives,
            totalCount,
        };
    } catch (err) {
        console.error(err);
    }
};
