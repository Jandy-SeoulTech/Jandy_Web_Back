import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findById = async (userId, postId) => {
    try {
        return await prisma.attention.findUnique({
            where: {
                attentionKey: {
                    userId,
                    postId,
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};
