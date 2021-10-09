import { PrismaClient } from "@prisma/client";
import { dbNow, StringToDate } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const findById = async (id) => {
    try {
        return prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
                attention: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                nickname: true,
                            },
                        },
                    },
                },
                images: {
                    select: {
                        src: true,
                    },
                },
                channelRoom: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createPost = async (data) => {
    try {
        return await prisma.post.create({
            data,
            include: {
                images: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updatePost = async (id, data) => {
    try {
        await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                images: {
                    deleteMany: {},
                },
            },
        });
        return await prisma.post.update({
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

export const deletePost = async (id) => {
    try {
        return await prisma.post.delete({
            where: { id },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findPostByChannelId = async (channelId, type, page, pageSize) => {
    try {
        const status = type == "All" ? undefined : type;
        const query = {
            where: {},
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        profile: true,
                    },
                },
            },
        };
        let whereQuery = {
            channelId,
        };
        let ret = [];
        if (!status) {
            whereQuery.status = "Notice";
            query.where = whereQuery;
            ret = await prisma.post.findMany(query);
        }
        whereQuery.status = status;
        if (!status) {
            whereQuery.NOT = [
                {
                    status: "Notice",
                },
            ];
        }
        query.where = whereQuery;
        query.skip = (page - 1) * pageSize;
        query.take = pageSize;
        ret = ret.concat(await prisma.post.findMany(query));

        return ret;
    } catch (err) {
        console.error(err);
    }
};

export const checkMyPost = async (id, authorId) => {
    try {
        return await prisma.post.findMany({
            where: {
                id,
                authorId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const checkPostClosed = async (id) => {
    try {
        return await prisma.post.findMany({
            where: {
                AND: [
                    {
                        id,
                    },
                    {
                        status: "Close",
                    },
                ],
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateOpen = async (id) => {
    try {
        return await prisma.post.update({
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

export const updateReserve = async (id, date) => {
    try {
        return await prisma.post.update({
            where: {
                id,
            },
            data: {
                status: "Reservation",
                reservedAt: StringToDate(date),
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateClaer = async (id) => {
    try {
        return await prisma.post.update({
            where: {
                id,
            },
            data: {
                status: "Clear",
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const checkPostCleared = async (id) => {
    try {
        return await prisma.post.findMany({
            where: {
                AND: [
                    {
                        id,
                    },
                    {
                        status: "Clear",
                    },
                ],
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateArchived = async (id) => {
    try {
        return await prisma.post.update({
            where: {
                id,
            },
            data: {
                status: "Archived",
            },
        });
    } catch (err) {
        console.error(err);
    }
};
