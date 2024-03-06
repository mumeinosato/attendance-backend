import { PrismaClient } from "@prisma/client";
import { getUserIdFromName } from "./name_to_id";
import { getPasswordNull, userExists } from "./account_info";
import * as bcrypt from "bcrypt";
import * as fs from 'fs'

const prisma = new PrismaClient();

export async function login(user: string, password: string): Promise<number> {
    let status = 0;
    /*
    0: ログイン成功
    1: ユーザーが存在しない
    2: パスワードが間違っている
    3: パスワードが未設定
    4: その他のエラー
    */
    const userid = await getUserIdFromName(user);
    if (userid === null) {
        return 1;
    }
    if (await userExists(userid)) {
        fs.writeFileSync('log.txt', String(await getPasswordNull(userid)));
        if(await getPasswordNull(userid)){
            return 3;
        }else{
            const pass = await bcrypt.hash(password, 10);
            const users = await prisma.user.findUnique({
                where: {
                    id: userid,
                },
                select: {
                    password: true
                },
            });
            if(!users){
                return 4;
            }
            //fs.writeFileSync('log.txt', users.password + "|" + pass);
            if (users.password === pass) {
                status = 0;
            } else {
                status = 2;
            }
            return status;
        }
    } else {
        return 1;
    }
}