import CredentialsProvider from "next-auth/providers/credentials";
import LoginHandler from "@/backend/services/LoginService";
import UserRepository from "@/backend/repositories/UserRepository";
import {getServerSession} from "next-auth";

export function getServerAuthSession() {
    return getServerSession(authOptions);
}

export const authOptions = {
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/auth/login",
    },

    callbacks: {
        async session({ session, token }) {
            if (token?.sub) {
                session.user = {
                    ...session.user,
                    id: token.sub,
                };
            }
            return session;
        },
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const userRepository = new UserRepository();
                const loginHandler = new LoginHandler(userRepository);

                const user = await loginHandler.execute(credentials);

                if (!user) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
};

