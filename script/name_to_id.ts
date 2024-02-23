import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserIdFromName(user: string): Promise<number | null> {
  try {
      const foundUser = await prisma.user.findFirst({
          where: {
              user: user,
          },
          select: {
              id: true
          }
      });

      if (!foundUser) {
          return null; // ユーザーが見つからない場合は null を返します
      }

      return foundUser.id;
  } catch (error) {
      console.error('Error finding user:', error);
      throw error;
  }
}