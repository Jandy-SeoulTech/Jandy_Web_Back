import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findLike = async(userId, channelId)=>{
    try {
        return await prisma.channelLike.findUnique({
            where: { 
                userId_channelId :{
                    userId,
                    channelId
                }
             },
        });
    } catch (err) {
        console.error(err);
    }
}