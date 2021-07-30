import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useCreateActivityContext } from "../context/CreateActivityContext";
import Calendar from "../components/Calendar";
import Layout from "../components/Layout";

export default function When() {
  const router = useRouter();
  const { dates } = useCreateActivityContext();

  const handleDatesSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/where");
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" && event.metaKey) {
        event.preventDefault();
        router.push("/where");
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [router]);

  return (
    <Layout title="When?">
      <div className="mb-4 p-3 outline-none appearance-none bg-black text-white w-full text-6xl">
        <Calendar />
      </div>
      <button
        className="flex items-center bg-gray-600 text-white py-2 px-4 ml-auto text-lg disabled:cursor-not-allowed disabled:text-gray-500"
        disabled={!dates || dates.length === 0}
        onClick={handleDatesSubmission}
      >
        <span className="mr-1">suggest places</span>
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
    </Layout>
  );
}
