import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const createReview = async (
    reviewerId,
    reviewedUserId,
    content,
    status,
    channelId
) => {
    try {
        return await prisma.review.create({
            data: {
                reviewerId,
                reviewedUserId,
                content,
                status,
                channelId,
                createdAt: dbNow(),
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findReviewByUserId = async (id) => {
    try {
        console.log(id);
        return await prisma.review.findMany({
            where: {
                reviewedUserId: id,
            },
            include: {
                reviewChannel: {
                    select: {
                        name: true,
                        channelImage: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};
