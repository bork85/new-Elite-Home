import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from "../../config/database";
import "dotenv/config";
import { AppError } from '../../utils/errors';

interface LoginInput {
    email: string;
    password: string;
}

class LoginService {
    async execute(input: LoginInput){
        const user = await prisma.user.findUnique({
            where: {
                email: input.email,
            }
        })
        if(!user){
            throw new AppError("Credenciais inválidas, tente novamente", 401)
        }
        const passwordMatch = await bcrypt.compare(input.password, user.password);
        if(!passwordMatch){
            throw new AppError("Credenciais inválidas, tente novamente", 401)
        }
        if(process.env.JWT_SECRET_KEY){
            const JWT_Key: string = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(
            {
            id: user.id,
            email: user.email,
            role: user.role
            },
            JWT_Key,
            {
            expiresIn: "12h"
            },
        );
        const safeUser = {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        }
        return {token, user: safeUser};
        }
        throw new AppError("Erro interno no servidor, tente mais tarde. Code:jwt2", 500)
    };   
    
}
export default LoginService;