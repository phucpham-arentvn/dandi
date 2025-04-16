import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "./lib/supabase";
import { User } from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user.email) return false;
      try {
        // Check if user exists
        const { data: existingUser } = await supabase
          .from("users")
          .select()
          .eq("email", user.email)
          .single();

        if (!existingUser) {
          // Create new user
          const { error: createError } = await supabase.from("users").insert([
            {
              email: user.email,
              name: user.name,
              image: user.image,
              last_sign_in: new Date().toISOString(),
            },
          ]);

          if (createError) throw createError;
        } else {
          // Update existing user
          const { error: updateError } = await supabase
            .from("users")
            .update({
              name: user.name,
              image: user.image,
              last_sign_in: new Date().toISOString(),
            })
            .eq("email", user.email);

          if (updateError) throw updateError;
        }

        return true;
      } catch (error) {
        console.error("Error saving user to Supabase:", error);
        return false;
      }
    },
  },
};

export const handler = NextAuth(authOptions);
