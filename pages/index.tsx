import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useCreateActivityContext } from "../context/CreateActivityContext";
import Layout from "../components/Layout";

export default function Home() {
  const router = useRouter();
  const { occasion, setOccasion } = useCreateActivityContext();

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/when");
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" && event.metaKey) {
        event.preventDefault();
        router.push("/when");
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [router]);

  return (
    <Layout title="What's the occasion?">
      <form className="w-full" onSubmit={handleFormSubmission}>
        <textarea
          id="occasion"
          placeholder="e.g. trip to Ibiza"
          className="mb-4 p-3 outline-none appearance-none bg-black text-white w-full text-3xl sm:text-6xl border-0"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          onFocus={(e) => {
            const val = e.target.value;
            e.target.value = "";
            e.target.value = val;
          }}
          autoFocus
          rows={5}
          maxLength={140}
        />
        <button
          type="submit"
          className="flex items-center bg-gray-600 text-white py-2 px-4 ml-auto text-lg disabled:cursor-not-allowed disabled:text-gray-500"
          disabled={occasion.length < 1}
        >
          <span className="mr-1">suggest dates</span>
          <ChevronDoubleRightIcon className="h-5 w-5" />
        </button>
      </form>
    </Layout>
  );
}
