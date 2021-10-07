import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const findByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findById = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
export const createLocal = async (nickname, email, password) => {
    try {
        return await prisma.user.create({
            data: {
                nickname,
                email,
                password,
                provider: "local",
                createdAt: dbNow(),
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createSocial = async (data) => {
    try {
        return await prisma.user.create({
            data: {
                email: data.email,
                provider: data.provider,
                createdAt: dbNow(),
            },
        });
    } catch (err) {
        console.error(err);
    }
};
export const findByIdWithData = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nickname: true,
                email: true,
                provider: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByIdWithProfile = async (id) => {
    try {
        let data = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nickname: true,
                email: true,
                provider: true,
                followers: {
                    select: {
                        followerId: true,
                    },
                },
                followings: {
                    select: {
                        followingId: true,
                    },
                },
                profile: {
                    select: {
                        id: true,
                        department: true,
                        introduce: true,
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
                        profileImage: true,
                    },
                },
                reviewed: {
                    where: {
                        status: "good",
                    },
                },
                admin: true,
                participants: {
                    select: {
                        channel: true,
                    },
                },
            },
        });
        const participants = data.participants.map((v) => v.channel);

        return { ...data, participants };
    } catch (err) {
        console.error(err);
    }
};

export const findByNickname = async (nickname) => {
    try {
        return await prisma.user.findUnique({
            where: { nickname },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateNickname = async (data) => {
    try {
        return await prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                nickname: data.nickname,
                updatedAt: dbNow(),
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updatePassword = async (id, password) => {
    try {
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
                updatedAt: dbNow(),
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const Follow = async (id, followingId) => {
    try {
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                followings: {
                    create: {
                        followingId,
                        createdAt: dbNow(),
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const unFollow = async (id, followingId) => {
    try {
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                followings: {
                    delete: [
                        {
                            followKey: {
                                followerId: id,
                                followingId,
                            },
                        },
                    ],
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const LikeOnChannel = async (userId, channelId) => {
    try {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                channelLike: {
                    create: {
                        channel: {
                            connect: {
                                id: channelId,
                            },
                        },
                        createdAt: dbNow(),
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const unLikeOnChannel = async (userId, channelId) => {
    try {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                channelLike: {
                    deleteMany: {
                        userId,
                        channelId,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const EnterChannel = async (userId, channelId) => {
    try {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                participants: {
                    create: {
                        channel: {
                            connect: {
                                id: channelId,
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

export const ExitChannel = async (userId, channelId) => {
    try {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                participants: {
                    deleteMany: {
                        userId,
                        channelId,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const ChangeAdmin = async (userId, channelId) => {
    try {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                admin: {
                    connect: {
                        id: channelId,
                    },
                },
                participants: {
                    deleteMany: {
                        userId,
                        channelId,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const Ban = async (userId, channelId) => {
    try {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ban: {
                    create: {
                        channel: {
                            connect: {
                                id: channelId,
                            },
                        },
                        createdAt: dbNow(),
                    },
                },
                participants: {
                    deleteMany: {
                        userId,
                        channelId,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const CheckJoinChannel = async (id, channelId) => {
    try {
        return await prisma.user.findMany({
            where: {
                OR: [
                    {
                        admin: {
                            some: {
                                id: channelId,
                            },
                        },
                    },
                    {
                        participants: {
                            some: {
                                channelId,
                            },
                        },
                    },
                ],
                AND: {
                    id,
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const CheckMyChannel = async (id, channelId) => {
    try {
        return await prisma.user.findMany({
            where: {
                OR: [
                    {
                        admin: {
                            some: {
                                id: channelId,
                            },
                        },
                    },
                ],
                AND: {
                    id,
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const Attetnion = async (userId, postId) => {
    try {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                attention: {
                    create: {
                        post: {
                            connect: {
                                id: postId,
                            },
                        },
                        createdAt: dbNow(),
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const NotAttention = async (userId, postId) => {
    try {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                attention: {
                    deleteMany: {
                        postId,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByKeyword = async (keyword, offset = 0) => {
    try {
        return await prisma.user.findMany({
            skip: offset,
            take: 6,
            where: {
                OR: [
                    {
                        nickname: {
                            contains: keyword,
                        },
                    },
                    {
                        profile: {
                            wellTalent: {
                                some: {
                                    contents: {
                                        contains: keyword,
                                    },
                                },
                            },
                        },
                    },
                    {
                        profile: {
                            interestTalent: {
                                some: {
                                    contents: {
                                        contains: keyword,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                email: true,
                nickname: true,
                profile: {
                    select: {
                        department: true,
                        introduce: true,
                        wellTalent: true,
                        interestTalent: true,
                        profileImage: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findFollowerList = async (findUserId) => {
    try {
        return await prisma.user.findMany({
            where: {
                followings: {
                    some: {
                        followingId: findUserId,
                    },
                },
            },
            select: {
                id: true,
                email: true,
                nickname: true,
                profile: {
                    select: {
                        department: true,
                        introduce: true,
                        wellTalent: true,
                        interestTalent: true,
                        profileImage: true,
                    },
                },
                followers: true,
                followings: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
export const findFollowingList = async (findUserId) => {
    try {
        return await prisma.user.findMany({
            where: {
                followers: {
                    some: {
                        followerId: findUserId,
                    },
                },
            },
            select: {
                id: true,
                email: true,
                nickname: true,
                profile: {
                    select: {
                        department: true,
                        introduce: true,
                        wellTalent: true,
                        interestTalent: true,
                        profileImage: true,
                    },
                },
                followers: true,
                followings: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const CheckMyArchive = async (id, archiveId) => {
    try {
        return await prisma.user.findMany({
            where: {
                OR: [
                    {
                        archive: {
                            some: {
                                id: archiveId,
                            },
                        },
                    },
                ],
                AND: {
                    id,
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};


export const unLikeOnArchive = async (userId, archiveId) => {
    try {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                archiveLike: {
                    deleteMany: {
                        userId,
                        archiveId,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

