import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useCreateActivityContext } from "../context/CreateActivityContext";
import Calendar from "../components/Calendar";

export default function When() {
  const router = useRouter();
  const { dates } = useCreateActivityContext();

  const handleDatesSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/where");
  };

  React.useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" && event.metaKey) {
        console.log("Enter key was pressed. Run your function.");
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
    <div className="min-h-screen p-2">
      <Head>
        <title>brewdle | the doodle.com alternative</title>
        <meta
          name="description"
          content="Easy decision making for group activities."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.cdnfonts.com/css/kollektif"
          rel="stylesheet"
        />
      </Head>
      <header className="mb-12">
        <h1 className="text-3xl font-bold">brewdle</h1>
        <h2 className="text-sm">the doodle.com alternative</h2>
      </header>
      <div className="max-w-2xl mx-auto">
        <p className="mb-2 sm:mb-4 block text-4xl sm:text-6xl font-bold">
          When?
        </p>
        <div className="mb-4 p-3 outline-none appearance-none bg-black text-white w-full text-6xl">
          <Calendar />
        </div>
        <button
          className="flex items-center bg-gray-600 text-white py-2 px-4 ml-auto text-lg disabled:cursor-not-allowed disabled:text-gray-500"
          disabled={!dates || dates.length === 0}
          onClick={handleDatesSubmission}
        >
          <span className="mr-1">suggest places</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
