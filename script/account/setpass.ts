import { PrismaClient } from "@prisma/client";
import { getUserIdFromName } from "./name_to_id";
import { getPasswordNull, userExists } from "./account_info";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function setpass(user: string, password: string): Promise<number>{
    let status = 0;
    /*
    0: パスワード設定成功
    1: ユーザーが存在しない
    2: すでにパスワードが設定されている
    3: その他のエラー
    */

    const userid = await getUserIdFromName(user);
    if (userid === null) {
        return 1;
    }
    if(await userExists(userid)){
        try{
            if(await getPasswordNull(userid) == false){
                const pass = await bcrypt.hash(password, 10);
                await prisma.user.update({
                    where: {
                        id: userid,
                    },
                    data: {
                        password: pass,
                    },
                });
                return 0;
            }else{
                return 2;
            }
        }catch(error){
            console.error('Error executing query:', error);
            throw error;
        }
    }else{
        return 1;
    }
}