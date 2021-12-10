import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useCreatePollContext } from "../context/CreatePollContext";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabase";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { user } = useAuthContext();

  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: "google",
      },
      { redirectTo: "http://localhost:3000/what" }
    );
  };

  useEffect(() => {
    const listener = async (e: any) => {
      if (e.code === "Enter" && e.metaKey) {
        e.preventDefault();
        await signInWithGoogle();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [router]);

  return (
    <Layout
      title="First things first"
      subtitle="You have to sign in to access your poll result later."
    >
      <button
        className="flex items-center bg-gray-600 text-white py-2 px-4 ml-auto text-lg disabled:cursor-not-allowed disabled:text-gray-500"
        onClick={signInWithGoogle}
      >
        <span className="mr-1">sign in with google</span>
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
    </Layout>
  );
}
