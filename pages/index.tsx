import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useCreateActivityContext } from "../context/CreateActivityContext";

export default function Home() {
  const router = useRouter();
  const { occasion, setOccasion } = useCreateActivityContext();

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/time");
  };

  React.useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" && event.metaKey) {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        router.push("/time");
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
        <form className="w-full" onSubmit={handleFormSubmission}>
          <label
            htmlFor="occasion"
            className="mb-4 block text-3xl sm:text-6xl font-bold"
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
            className="bg-gray-600 text-white py-2 px-4 ml-auto block text-lg disabled:cursor-not-allowed disabled:text-gray-500"
            disabled={occasion.length < 1}
          >
            continue
          </button>
        </form>
      </div>
    </div>
  );
}
