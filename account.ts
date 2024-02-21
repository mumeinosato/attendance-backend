import { PrismaClient } from '@prisma/client'
import { getUserIdFromName } from './name_to_id'
import { hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export async function login(username: string, password: string): Promise<boolean> {
  const pass = await bcrypt.hash(password, 10);
  const userid = await getUserIdFromName(username);
  if (userid === null) {
    return false; // Return false if the user does not exist
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userid,
    },
    select: {
      password: true
    },
  });

  if (!user) {
    return false;
  }

  const count = await prisma.user.count({
    where: {
      id: userid,
      password: pass
    }
  });
  return count === 1;
}

export async function setPassword(user: string, password: string): Promise<void> {
  let userid = await getUserIdFromName(user);
  if (userid === null) {
    // ユーザーが存在しない場合の処理を追加する必要があります
    throw new Error('指定されたユーザーが見つかりませんでした。');
    userid = 0;
  }
  const pass = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: {
      id: userid, // Add a null check before assigning the userid
    },
    data: {
      password: pass,
    },
  });
}