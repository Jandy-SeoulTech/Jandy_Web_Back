import { PrismaClient } from "@prisma/client";
import { dbNow, StringToDate } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const findByRoomAndUserId = async (channelRoomId, userId) => {
    try {
        return await prisma.roomUser.findUnique({
            where: {
                channelRoomId,
                userId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const joinRoomUser = async (channelRoomId, userId) => {
    try {
        return await roomUser.create({
            data: {
                channelRoomId,
                userId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
