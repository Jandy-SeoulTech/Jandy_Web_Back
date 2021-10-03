import { PrismaClient } from "@prisma/client";
import { dbNow, StringToDate } from "../utils/dayUtils";

const prisma = new PrismaClient();

const createArchive = async(data) => {
    try {
        return prisma.archive.create(data);
    }
    catch (err) {
        console.error(err);
    }
}