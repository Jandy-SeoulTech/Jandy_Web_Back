import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findFollow = async (followerId, followingId) => {
    try {
        return await prisma.follow.findUnique({
            where: {
                followKey: {
                    followerId,
                    followingId,
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findFollowerUserAleadyFollowing = async (
    findUserId,
    loginedUserId
) => {
    try {
        return await prisma.follow.findMany({
            where: {
                AND: [
                    {
                        followingId: findUserId,
                    },
                    {
                        follower: {
                            followings: {
                                has: {
                                    followingId: loginedUserId,
                                },
                            },
                        },
                    },
                ],
            },
            select: {
                follower: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
