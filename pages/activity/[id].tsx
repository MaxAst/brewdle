import Head from "next/head";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useCreateActivityContext } from "../../context/CreateActivityContext";

export default function Vote() {
  const { occasion, dates, places } = useCreateActivityContext();

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
        <p className="mb-4 block text-3xl sm:text-6xl font-bold">{occasion}</p>
        <ul className="mb-4">
          {dates?.map((date) => (
            <li
              key={date}
              className="flex items-center justify-between text-2xl sm:text-5xl mb-2"
            >
              {date}
            </li>
          ))}
        </ul>
        <ul className="mb-4">
          {places?.map((place, index) => (
            <li
              key={place.id}
              className="flex items-center justify-between text-2xl sm:text-5xl mb-2"
            >
              <div className="flex items-center">
                <div className="w-14 text-right mr-2">{index + 1}.</div>
                <a
                  className="hover:underline"
                  href={
                    place.link?.includes("http")
                      ? place.link
                      : `https://${place.link}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {place.name}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
