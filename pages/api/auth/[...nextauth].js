import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  jwt: {
    encryption: true,
  },

  secret: process.env.GOOGLE_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        try{
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/patients/login/google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToken: account.id_token
              })
            }
          )
         console.log(res);
         return res;
        }
        catch(err){
          console.log(err)
        }
      }
    },
    redirect: async (url, _baseUrl) => {
      if (url === "/paciente/login") {
        return Promise.resolve("/paciente/authPaciente")
      }
      return Promise.resolve("/paciente/authPaciente")
    },
  },
})
