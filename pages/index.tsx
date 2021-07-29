import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useCreateActivityContext } from "../context/CreateActivityContext";

export default function Home() {
  const router = useRouter();
  const { occasion, setOccasion } = useCreateActivityContext();

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/when");
  };

  React.useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" && event.metaKey) {
        console.log("Enter key was pressed. Run your function.");
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
        <h2 className="text-sm">doodle.com for your social life</h2>
      </header>
      <div className="max-w-2xl mx-auto">
        <form className="w-full" onSubmit={handleFormSubmission}>
          <label
            htmlFor="occasion"
            className="mb-2 sm:mb-4 block text-4xl sm:text-6xl font-bold"
          >
            What&apos;s the occasion?
          </label>
          <textarea
            id="occasion"
            className="mb-4 p-3 outline-none appearance-none bg-black text-white w-full text-3xl sm:text-6xl"
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
        </form>
      </div>
    </div>
  );
}
