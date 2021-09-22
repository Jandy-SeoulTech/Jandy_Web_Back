import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findBan = async (userId, channelId) => {
    try {
        return await prisma.ban.findUnique({
            where: {
                banKey: {
                    userId,
                    channelId,
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};
