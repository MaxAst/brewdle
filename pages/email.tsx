import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useCreatePollContext } from "../context/CreatePollContext";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabase";
import { useAuthContext } from "../context/AuthContext";

export default function Email() {
  const router = useRouter();
  const { email, setEmail } = useCreatePollContext();
  const { user } = useAuthContext();

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const { error } = await supabase.auth.signIn({
        email,
      });
      console.error(error);
    }
    router.push("/poll/1");
  };

  useEffect(() => {
    const listener = async (e: any) => {
      if (e.code === "Enter" && e.metaKey) {
        e.preventDefault();
        if (email) {
          const { error } = await supabase.auth.signIn({
            email,
          });
          console.error(error);
        }
        router.push("/poll/1");
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [router]);

  return (
    <Layout
      title="What's your email?"
      subtitle="Necessary so that you can access your poll result later."
    >
      <form className="w-full" onSubmit={handleFormSubmission}>
        <input
          id="email"
          placeholder="e.g. paris@hilton.com"
          className="mb-4 p-3 outline-none appearance-none bg-black text-white w-full text-3xl sm:text-6xl border-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={(e) => {
            const val = e.target.value;
            e.target.value = "";
            e.target.value = val;
          }}
          autoFocus
        />
        <button
          type="submit"
          className="flex items-center bg-gray-600 text-white py-2 px-4 ml-auto text-lg disabled:cursor-not-allowed disabled:text-gray-500"
          disabled={email.length < 1}
        >
          <span className="mr-1">invite friends</span>
          <ChevronDoubleRightIcon className="h-5 w-5" />
        </button>
      </form>
    </Layout>
  );
}
