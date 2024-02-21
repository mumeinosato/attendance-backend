import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserIdFromName(user: string): Promise<number | null> {
  try {
    const foundUser = await prisma.user.findMany({
      where: {
        user: user, // Replace 'user' with 'name'
      },
      select: {
        id: true,
      },
    });

    // ユーザーが見つかった場合はユーザーのIDを返す
    if (foundUser.length > 0) {
      return foundUser[0].id;
    } else {
      return null; // ユーザーが見つからなかった場合はnullを返す
    }
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}