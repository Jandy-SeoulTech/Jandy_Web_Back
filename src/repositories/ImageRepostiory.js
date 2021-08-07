import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProfileImage = async (src, profileId) => {
    try {
        console.log(src, profileId);
        return await prisma.image.create({
            data: {
                src,
                profileId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
