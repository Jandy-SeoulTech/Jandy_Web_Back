import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const createReview = async (
    reviewerId,
    reviewedUserId,
    content,
    status
) => {
    try {
        return await prisma.review.create({
            data: {
                reviewerId,
                reviewedUserId,
                content,
                status,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
