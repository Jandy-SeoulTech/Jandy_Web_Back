import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInterestTalent = async (contents, profileId) => {
    try {
        return await prisma.talent.create({
            data: {
                contents,
                profileId,
                identifier: "interest",
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createWellTalent = async (contents, profileId) => {
    try {
        return await prisma.talent.create({
            data: {
                contents,
                profileId,
                identifier: "Well",
            },
        });
    } catch (err) {
        console.error(err);
    }
};
