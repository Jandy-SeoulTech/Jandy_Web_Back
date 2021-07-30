import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findById = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
export const createLocal = async (data) => {
    try {
        return await prisma.user.create({
            data: {
                nickname: data.nickname,
                email: data.email,
                password: data.password,
                provider: "local",
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByIdWithData = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nickname: true,
                email: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByNickname = async (nickname) => {
    try {
        return await prisma.user.findUnique({
            where: { nickname },
        });
    } catch (err) {
        console.error(err);
    }
};
