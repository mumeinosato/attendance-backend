import { PrismaClient } from '@prisma/client';
import { getUserIdFromName } from './account/name_to_id';

const prisma = new PrismaClient();

export async function attendance(user: string, status: number, reason: string): Promise<void> {
    try {
        const userId = await getUserIdFromName(user);

        if (userId === null) {
            throw new Error('指定されたユーザーが見つかりませんでした。');
        }

        let updateField: 'attendance' | 'absence' = 'attendance';
        if (status === 2 || status === 3) {
            updateField = 'absence';
        }

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                [updateField]: {
                    increment: 1, // ユーザーの出席または欠席を増やす
                },
            },
        });

        await prisma.attendance.create({
            data: {
                user: user,
                status: status,
                reason: reason,
            },
        }); 
    } catch (error) {
        console.error('クエリの実行中にエラーが発生しました:', error);
        throw error;
    }
}
