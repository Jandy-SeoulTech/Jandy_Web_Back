import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const prisma = new PrismaClient();

export const findByEmail = async (email) => {
    try {
        return await prisma.auth.findUnique({
            where: {
                email: email,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createAuth = async (data) => {
    try {
        return await prisma.auth.create({
            data: {
                email: data.email,
                auth: data.auth,
                createdAt: dbNow(),
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateAuth = async (data) => {
    try {
        return await prisma.auth.update({
            where: {
                email: data.email,
            },
            data: {
                auth: data.auth,
                updatedAt: now,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const AuthGenerate = async (data) => {
    try {
        const exAuth = await findByEmail(data.email);
        if (exAuth) {
            return await updateAuth(data);
        } else {
            return await createAuth(data);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const deleteAuth = async (data) => {
    try {
        return await prisma.auth.delete({
            where: {
                email: data.email,
                auth: data.auth,
            },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
