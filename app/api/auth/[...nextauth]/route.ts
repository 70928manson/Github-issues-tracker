import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      token: 'https://github.com/login/oauth/access_token',
      authorization: {
        params: {
          scope: "repo"
        }
      }
    }),
  ],
  //神來了 https://stackoverflow.com/questions/69068495/how-to-get-the-provider-access-token-in-next-auth
  callbacks: {
    async jwt({ token, account }) {      
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token });
      }
      return token
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, { access_token: token.access_token })
      }
      return session
    }
  }
});

export { handler as GET, handler as POST };
