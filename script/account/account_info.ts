import { PrismaClient } from '@prisma/client'
import { getUserIdFromName } from './name_to_id'

const prisma = new PrismaClient()

export async function getPasswordNull(userid: number): Promise<boolean> {
    try {
        //const userid = await getUserIdFromName(user);
        if (userid === null) {
            return false; // Return false if the user does not exist
        }
        const foundUser = await prisma.user.findUnique({
            where: {
                id: userid, // Corrected the where object to include the id property
            },
            select: {
                password: true,
            },
        });

        if (!foundUser) {
            return false; // Return false if the user does not exist
        }

        if (foundUser.password === null) {
            return true; // Return true if the password is null
        } else {
            return false; // Return false if the password is not null
        }
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

export async function getAccountInfo(user: string): Promise<any> {
    const userid = await getUserIdFromName(user);
    if (userid === null) {
        return false; // Return false if the user does not exist
    }
    return prisma.user.findUnique({
        where: {
            id: userid,
        },
    });
}

export async function userExists(userid: number): Promise<boolean> {
    //const userid = await getUserIdFromName(username);
    if (userid === null) {
        return false; // Return false if the user does not exist
    }
    const user = await prisma.user.findUnique({
        where: {
            id: userid,
        },
    });

    return user !== null;
}

export async function accountList(): Promise<any> {
    return prisma.user.findMany({
        select: {
            user: true,
            name: true,
            admin: true,
            group: true,
            attendance: true,
            absence: true,
        },
    });
}