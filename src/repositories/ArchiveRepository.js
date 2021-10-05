import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createArchive = async(data) => {
    try {
        return prisma.archive.create({data});
    }
    catch (err) {
        console.error(err);
    }
}

export const deleteArchive = async (id) => {
    try {
        return await prisma.archive.delete({
            where: { id },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateArchive = async (id,data) => {
    try {
        await prisma.archive.update({
            where: {
                id : id
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
export const findById = async (id) => {
    try {
        return prisma.archive.findUnique({
            where : {id},
            include: {
                owner: {
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
                post : {
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
                    }
                },
                archiveComment: {
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
                images: {
                    select: {
                        src: true,
                    },
                },
            },
        });
    }
    catch (err) {
        console.error(err);
    }
}