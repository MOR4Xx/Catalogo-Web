import bcrypt from "bcryptjs";

export default class UserRepository {
    async findByEmail(email) {
        // SIMULA UM USUÁRIO NO BANCO
        if (email !== "admin@admin.com") return null;

        return {
            id: "1",
            name: "Administrador",
            email: "admin@admin.com",
            passwordHash: await bcrypt.hash("123456", 10),
        };
    }
}
