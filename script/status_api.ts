import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function statusNum(num: number): Promise<number | null> {
    try {
        const status = await prisma.status.findUnique({
            where: {
                id: 1, // ここに適切なidを指定してください
            },
            select: {
                num1: num === 1,
                num2: num === 2,
                num3: num === 3,
                num4: num === 4,
                num5: num === 5,
            },
        });

        if (!status) {
            console.log('Status not found');
            return null;
        }

        // status オブジェクトの値を検証し、対応する num の値を返す
        for (const key in status) {
            if (status[key as keyof typeof status] !== null) {
                return status[key as keyof typeof status];
            }
        }

        // ここに到達するのは status が null または num に対応するフィールドが null の場合です
        return null;
    } catch (error) {
        console.error('Error fetching status:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function setStatusNum(num: number, value: number): Promise<void> {
    try {
        await prisma.status.update({
            where: {
                id: 1, // ここに適切なidを指定してください
            },
            data: {
                num1: num === 1 ? value : null,
                num2: num === 2 ? value : null,
                num3: num === 3 ? value : null,
                num4: num === 4 ? value : null,
                num5: num === 5 ? value : null,
            },
        });
    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function statusString(num: number): Promise<string | null> {
    try {
        const status = await prisma.status.findUnique({
            where: {
                id: 1, // ここに適切なidを指定してください
            },
            select: {
                string1: num === 1,
                string2: num === 2,
                string3: num === 3,
                string4: num === 4,
                string5: num === 5,
            },
        });

        if (!status) {
            console.log('Status not found');
            return null;
        }

        // status オブジェクトの値を検証し、対応する num の値を返す
        for (const key in status) {
            if (status[key as keyof typeof status] !== null) {
                return status[key as keyof typeof status];
            }
        }

        // ここに到達するのは status が null または num に対応するフィールドが null の場合です
        return null;
    } catch (error) {
        console.error('Error fetching status:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function setStatusString(num: number, value: string): Promise<void> {
    try {
        await prisma.status.update({
            where: {
                id: 1, // ここに適切なidを指定してください
            },
            data: {
                string1: num === 1 ? value : null,
                string2: num === 2 ? value : null,
                string3: num === 3 ? value : null,
                string4: num === 4 ? value : null,
                string5: num === 5 ? value : null,
            },
        });
    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}