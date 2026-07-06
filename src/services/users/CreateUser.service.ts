import prisma from "../../config/database";
import bcrypt from "bcrypt";
import { UserRole } from "../../generated/prisma/enums";
import { AppError } from "../../utils/errors";

interface CreateUserInput {
    name: string,
    email: string,
    phone: string,
    password: string,
    role?: UserRole
}

class CreateUserService {
    async execute(input: CreateUserInput) {
        const existUser = await prisma.user.findFirst({
            where: {
                email: input.email,
            },
        });
        if(existUser){
            throw new AppError("User with this email already exists.");
        }
        const hashPassword = await bcrypt.hash(input.password, 8);
        const user = await prisma.user.create({ 
            data: { 
                name: input.name, 
                email: input.email, 
                phone: input.phone,
                password: hashPassword, 
                role: (input.role || "OWNER") as UserRole
            }
        });
        return user;
    }
    //async execute({ name, email, password, role }: CreateUserInput) {}
}

export default new CreateUserService();
