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

/*export async function login(name: string, password: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      name: name
    },
    select: {
      password: true
    },
  });
  
  if(!user){
    return false;
  }

  const count = await prisma.user.count({
    where: {
      name: name,
      password: password
    }
  });
  return count === 1;
}

export async function getAccountInfo(name: string): Promise<any> {
  return prisma.user.findUnique({
    where: {
      name: name
    },
  });
}

export async function setPassword(name: string, password: string): Promise<void> {
  await prisma.user.update({
    where: {
      name: name,
    },
    data: {
      password: password,
    },
  });
}

export async function userExists(name: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });
  
  return user !== null;
}
*/