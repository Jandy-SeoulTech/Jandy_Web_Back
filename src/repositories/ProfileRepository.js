import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const findById = async (id) => {
    try {
        return await prisma.profile.findUnique({
            where: { id },
        });
    } catch (err) {
        console.error(err);
    }
};

export const fineByUserId = async (userId) => {
    try {
        return await prisma.profile.findMany({
            where: {
                userId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createProfile = async (option) => {
    try {
        return await prisma.profile.create({
            data: option,
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateProfile = async (
    id,
    department,
    introduce,
    src,
    WellTalentOption,
    InterestTalentOption
) => {
    try {
        console.log(WellTalentOption);
        console.log(InterestTalentOption);
        await prisma.profile.update({
            where: {
                id,
            },
            data: {
                department,
                introduce,
                updatedAt: dbNow(),
                profileImage: src,
                wellTalent: {
                    deleteMany: {},
                },
                interestTalent: {
                    deleteMany: {},
                },
            },
        });
        await prisma.profile.update({
            where: { id },
            data: {
                wellTalent: {
                    createMany: {
                        data: WellTalentOption,
                    },
                },
                interestTalent: {
                    createMany: {
                        data: InterestTalentOption,
                    },
                },
            },
        });
        return true;
    } catch (err) {
        console.error(err);
    }
};
