import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";
import { LoginUser, SessionUser, JWTToken } from "../../interfaces";
import { use } from "react";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<LoginUser | null> {
        if (!credentials) return null;

        const user = await userLogin(credentials.email, credentials.password);

        if (user) {
          return {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            role: user.user.role,
            token: user.token,
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as LoginUser).id;
        token.token = (user as LoginUser).token;
        token.role = (user as LoginUser).role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token.id! as string;       
        session.user.token = token.token! as string;
        session.user.role = token.role! as string;
      }
      return session;
    },
  },
};