import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findById = async (id) => {
    try{
        return prisma.post.findUnique({
            where: {id},
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
                comment : {
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
                        content:true,
                        createdAt: true,
                        updatedAt: true
                    }
                },
                attention : {
                    select: {
                        user : {
                            select: {
                                id: true,
                                email: true,
                                nickname: true,
                            }
                        }
                    }
                },
            },
        });
    }
    catch(err){
        console.error(err);
    }
}

export const createPost = async (data) => {
    try{
        return await prisma.post.create({
            data,
            include: {
                files : true
            }
        });
    }
    catch(err){
        console.error(err);
    }
}

export const updatePost = async (data) => {
    try{
        await prisma.post.update({
            where: {
                id: parseInt(data.id, 10),
            },
            data: {
                files: {
                    deleteMany: {},
                },
            }
        })
        return await prisma.post.update({
            where: { id: parseInt(data.id, 10) },
            data,
            include: {
                files : true
            }
        });
    }
    catch(err){
        console.error(err);
    }
}

export const deletePost = async (id) => {
    try{
        return await prisma.post.delete({
            where : {id}
        })
    }
    catch (err) {
        console.error(err);
    }
}

export const findPostByChannelId = async (channelId) => {
    try {
        return await prisma.post.findMany({
            where: {
                channelId,
            },
            orderBy: [
                {
                    status: "asc"
                },
                {
                    createdAt: "desc",
                },
                {
                    updatedAt: "desc"
                }
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

export const CheckMyPost = async (id,authorId) => {
    try{
        return await prisma.post.findMany({
           where: {
               id,
               authorId
           }
        })
    }
    catch (err) {
        console.error(err);
    }
};
