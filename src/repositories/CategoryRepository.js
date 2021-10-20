import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findOneByCode = async (code) => {
    try {
        return await prisma.category.findUnique({
            where: {
                code,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
