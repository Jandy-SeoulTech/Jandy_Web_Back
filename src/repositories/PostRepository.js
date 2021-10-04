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
                comment: {
                    select: {
                        author: {
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
                        content: true,
                        createdAt: true,
                        updatedAt: true,
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

export const updatePost = async (id,data) => {
    try {
        await prisma.post.update({
            where: {
                id : id
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

export const findPostByChannelId = async (channelId) => {
    try {
        return await prisma.post.findMany({
            where: {
                channelId,
                NOT: [
                    {
                        status: "Clear",
                    },
                ],
            },
            orderBy: [
                {
                    status: "asc",
                },
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