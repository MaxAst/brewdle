import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type AuthContextType = {
  userLoaded: boolean;
  user: User | null;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setUserLoaded(session ? true : false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setUserLoaded(!!currentUser);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        userLoaded,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextType => useContext(AuthContext);
