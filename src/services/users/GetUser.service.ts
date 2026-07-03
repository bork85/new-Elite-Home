import prisma from "../../config/database";

class GetUserService {
    async execute() {
        const user = await prisma.user.findMany({
            where: {
                email: { not: "" }
                }
            }
        );
        return user;
    }
}

export default new GetUserService();
