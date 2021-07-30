import Head from "next/head";

export default function Header() {
  return (
    <div>
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
      <header className="mb-7">
        <h1 className="text-3xl font-bold">brewdle</h1>
        <h2 className="text-sm">doodle.com for your social life</h2>
      </header>
    </div>
  );
}
