import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useCreatePollContext } from "../context/CreatePollContext";
import Layout from "../components/Layout";

export default function Who() {
  const router = useRouter();
  const { name, setName } = useCreatePollContext();

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("email");
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" && event.metaKey) {
        event.preventDefault();
        router.push("email");
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [router]);

  return (
    <Layout title="What's your name?">
      <form className="w-full" onSubmit={handleFormSubmission}>
        <input
          id="name"
          placeholder="e.g. Paris Hilton"
          className="mb-4 p-3 outline-none appearance-none bg-black text-white w-full text-3xl sm:text-6xl border-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          disabled={name.length < 1}
        >
          <span className="mr-1">final step</span>
          <ChevronDoubleRightIcon className="h-5 w-5" />
        </button>
      </form>
    </Layout>
  );
}
