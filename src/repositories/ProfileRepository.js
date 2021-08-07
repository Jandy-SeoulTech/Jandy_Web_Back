import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findById = async (id) => {
    try {
        return await prisma.profile.findUnique({
            where: { id },
            include: {
                profileImage: true,
            },
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

export const create = async (userId) => {
    try {
        return await prisma.profile.create({
            data: {
                userId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateByDepartment = async (id, department) => {
    try {
        return await prisma.profile.update({
            where: {
                id: id,
            },
            data: {
                department,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateByIntroduce = async (id, introduce) => {
    try {
        return await prisma.profile.update({
            where: {
                id: id,
            },
            data: {
                introduce,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
