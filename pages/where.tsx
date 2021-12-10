import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCreatePollContext } from "../context/CreatePollContext";
import Layout from "../components/Layout";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/outline";

const PlaceForm = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const { setPlaces } = useCreatePollContext();
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
        className="mb-2 p-3 outline-none appearance-none bg-black text-white w-full text-3xl sm:text-6xl border-0"
        value={name}
        placeholder="name of place"
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <input
        id="where"
        className="mb-2 p-3 outline-none appearance-none bg-black text-white w-full text-xl sm:text-3xl border-0"
        value={link}
        placeholder="link (optional)"
        onChange={(e) => setLink(e.target.value)}
      />
      {name.length > 0 && (
        <button type="submit" className="text-lg mb-2 underline cursor-pointer">
          Press enter or click here to add as choice
        </button>
      )}
    </form>
  );
};

export default function Where() {
  const router = useRouter();
  const { places, setPlaces } = useCreatePollContext();

  const handlePlacesSubmission = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/poll/1");
  };

  const handleRemovePlace = (placeId: string) => {
    setPlaces(places?.filter((p) => p.id !== placeId));
  };

  return (
    <Layout title="Where?" subtitle="Suggest places for others to vote on.">
      <ol className="mb-4 list-decimal list-inside">
        {places?.map((place) => (
          <li key={place.id} className="relative text-3xl sm:text-5xl mb-2">
            {place.link ? (
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
            ) : (
              place.name
            )}
            <button
              className="absolute top-3 right-0 hover:cursor-pointer"
              onClick={() => handleRemovePlace(place.id)}
            >
              <XCircleIcon className="h-7 w-7 sm:h-8 sm:w-8" />
            </button>
          </li>
        ))}
      </ol>
      <PlaceForm />
      <button
        className="flex items-center bg-gray-600 text-white py-2 px-4 ml-auto text-lg disabled:cursor-not-allowed disabled:text-gray-500"
        disabled={!places || places.length === 0}
        onClick={handlePlacesSubmission}
      >
        <span className="mr-1">invite friends</span>
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
    </Layout>
  );
}
