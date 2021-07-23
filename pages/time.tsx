import Head from "next/head";
import React from "react";
import { useCreateActivityContext } from "../context/CreateActivityContext";
import Calendar from "../components/Calendar";

export default function Time() {
  const { occasion, dates } = useCreateActivityContext();

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" && event.metaKey) {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

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
        <form className="w-full" onSubmit={handleFormSubmission}>
          <label
            htmlFor="occasion"
            className="mb-4 block text-3xl sm:text-6xl font-bold"
          >
            Choose possible dates:
          </label>
          <div
            id="dates"
            className="mb-4 p-3 outline-none appearance-none bg-black text-white w-full text-6xl"
          >
            <Calendar />
          </div>
          <button
            type="submit"
            className="bg-gray-600 text-white py-2 px-4 ml-auto block text-lg disabled:cursor-not-allowed disabled:text-gray-500"
            disabled={!dates || dates.length === 0}
          >
            continue
          </button>
        </form>
      </div>
    </div>
  );
}
