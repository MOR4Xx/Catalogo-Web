import bcrypt from "bcryptjs";

export default class LoginService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ email, password }) {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios");
        }

        // 1️⃣ Busca usuário
        const user = await this.userRepository.findByEmail(email);
        if (!user) return null;

        // 2️⃣ Compara senha
        const passwordMatch = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatch) return null;

        // 3️⃣ Retorna usuário seguro
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
