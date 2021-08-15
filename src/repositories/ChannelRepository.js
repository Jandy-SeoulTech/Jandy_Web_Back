import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const createChannel = async (option) => {
    try {
        return await prisma.channel.create({
            data: option,
        });
    } catch (err) {
        console.error(err);
    }
};

export const findById = async (id) =>{
    try {
        return await prisma.channel.findUnique({
            where: { id },
            include :{
                admin : {
                    select : {
                        id :  true,
                        email: true,
                        nickname: true
                    }
                },
                participants : true,
                category : {
                    include : {
                        category :true,
                    }
                },
                tags : {
                    include : {
                        tag : true
                    }
                }
            }
        });
    }
    catch(err){
        console.error(err);
    }
}

export const findManyByUserid = async (id) => {
    try{
        return await prisma.channel.findMany({
            where : {
                adminId : id
            },
            include :{
                admin  : {
                    select : {
                        id :  true,
                        email: true,
                        nickname: true
                    }
                },
                participants : true,
                category : {
                    include : {
                        category :true,
                    }
                },
                tags : {
                    include : {
                        tag : true
                    }
                }
            }
        })
    } catch(err){
        console.error(err);
    } 
}