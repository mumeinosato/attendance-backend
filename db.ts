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

export async function getPasswordNull(user: string): Promise<boolean> {
  try {
    const userid = await getUserIdFromName(user);
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

    return foundUser.password === null;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

export async function login(username: string, password: string): Promise<boolean> {
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
      password: password
    }
  });
  return count === 1;
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

export async function setPassword(user: string, password: string): Promise<void> {
  let userid = await getUserIdFromName(user);
  if (userid === null) {
    // ユーザーが存在しない場合の処理を追加する必要があります
    throw new Error('指定されたユーザーが見つかりませんでした。');
    userid = 0;
  }
  await prisma.user.update({
    where: {
      id: userid, // Add a null check before assigning the userid
    },
    data: {
      password: password,
    },
  });
}

export async function userExists(username: string): Promise<boolean> {
  const userid = await getUserIdFromName(username);
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
