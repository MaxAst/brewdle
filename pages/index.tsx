import Head from "next/head";
import React from "react";

export default function Home() {
  const [occasion, setOccasion] = React.useState("");

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="min-h-screen p-2 bg-gradient-to-r from-pastel-violet to-pastel-yellow">
      <Head>
        <title>gottfried | The Open Source Doodle Alternative</title>
        <meta
          name="description"
          content="Easy decision making for group activities."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="mb-12">
        <h1 className="text-3xl font-bold">gottfried</h1>
        <h2 className="text-sm">the open-source doodle</h2>
      </header>
      <div className="flex flex-col justify-center items-center">
        <h1 className="mb-8 text-4xl font-medium text-center">
          What's the occasion?
        </h1>
        <form className="" onSubmit={handleFormSubmission}>
          <input
            className="outline-none appearance-none bg-transparent w-96 text-4xl"
            placeholder="Cheeky pints with the lads"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
