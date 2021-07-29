import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCreateActivityContext } from "../context/CreateActivityContext";

const PlaceForm = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const { setPlaces } = useCreateActivityContext();
  const ref = useRef<HTMLInputElement>(null);

  const addPlace = useCallback(() => {
    if (name.trim().length > 0) {
      setPlaces((places) =>
        places
          ? [...places, { id: uuidv4(), name, link }]
          : [{ id: uuidv4(), name, link }]
      );
    }
    setName("");
    setLink("");
    ref.current?.focus();
  }, [name, link, setName, setLink, setPlaces]);

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" && event.metaKey) {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        addPlace();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [addPlace]);

  const handlePlaceFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    addPlace();
  };

  return (
    <form onSubmit={handlePlaceFormSubmission}>
      <input
        id="where"
        ref={ref}
        className="mb-2 p-3 outline-none appearance-none bg-black text-white w-full text-3xl sm:text-6xl"
        value={name}
        placeholder="name of place"
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <input
        id="where"
        className="mb-2 p-3 outline-none appearance-none bg-black text-white w-full text-xl sm:text-3xl"
        value={link}
        placeholder="link (optional)"
        onChange={(e) => setLink(e.target.value)}
      />
      <button type="submit" className="text-lg mb-2 underline cursor-pointer">
        + add place
      </button>
    </form>
  );
};

export default function Where() {
  const router = useRouter();
  const { places, setPlaces } = useCreateActivityContext();

  const handlePlacesSubmission = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/activity/1");
  };

  const handleRemovePlace = (placeId: string) => {
    setPlaces(places?.filter((p) => p.id !== placeId));
  };

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
        <p className="mb-4 block text-4xl sm:text-6xl font-bold">Where?</p>
        <ul className="mb-4">
          {places?.map((place, index) => (
            <li
              key={place.id}
              className="flex items-center justify-between text-3xl sm:text-5xl mb-2"
            >
              <div className="flex items-center">
                <div className="w-7 sm:w-14 text-right mr-2">{index + 1}.</div>
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
              <button
                className="hover:cursor-pointer"
                onClick={() => handleRemovePlace(place.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <PlaceForm />
        <button
          className="flex items-center bg-gray-600 text-white py-2 px-4 ml-auto text-lg disabled:cursor-not-allowed disabled:text-gray-500"
          disabled={!places || places.length === 0}
          onClick={handlePlacesSubmission}
        >
          <span className="mr-1">invite friends</span>
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
