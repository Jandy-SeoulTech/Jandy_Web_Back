import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const CreateComment = async (data) => {
    try {
        return await prisma.comment.create({
            data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const UpdateComment = async (data) => {
    try {
        return await prisma.comment.update({
            where: { id: data.id },
            data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const DeleteComment = async (id) => {
    try {
        return await prisma.comment.delete({
            where: { id },
        });
    } catch (err) {
        console.error(err);
    }
};

export const CheckMyComment = async (id, authorId) => {
    try {
        return await prisma.comment.findMany({
            where: {
                id,
                authorId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
