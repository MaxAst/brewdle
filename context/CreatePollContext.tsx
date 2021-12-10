import React, { createContext, useContext, useState } from "react";

type Place = {
  id: string;
  name: string;
  link?: string;
};

type CreatePollContextType = {
  occasion: string;
  setOccasion: React.Dispatch<React.SetStateAction<string>>;
  dates?: string[];
  setDates: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  places?: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[] | undefined>>;
};

export const CreatePollContext = createContext<CreatePollContextType>(
  {} as CreatePollContextType
);

export default function CreatePollContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [occasion, setOccasion] = useState("");
  const [dates, setDates] = useState<string[]>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [places, setPlaces] = useState<Place[]>();

  return (
    <CreatePollContext.Provider
      value={{
        occasion,
        setOccasion,
        dates,
        setDates,
        name,
        setName,
        email,
        setEmail,
        places,
        setPlaces,
      }}
    >
      {children}
    </CreatePollContext.Provider>
  );
}

export const useCreatePollContext = (): CreatePollContextType =>
  useContext(CreatePollContext);
