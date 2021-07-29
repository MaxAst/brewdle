import React, { createContext, useContext, useState } from "react";

type Place = {
  id: string;
  name: string;
  link?: string;
};

type CreateActivityContextType = {
  occasion: string;
  setOccasion: React.Dispatch<React.SetStateAction<string>>;
  dates?: string[];
  setDates: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  places?: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[] | undefined>>;
};

export const CreateActivityContext = createContext<CreateActivityContextType>(
  {} as CreateActivityContextType
);

export default function SlackContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [occasion, setOccasion] = useState("");
  const [dates, setDates] = useState<string[]>();
  const [places, setPlaces] = useState<Place[]>();

  return (
    <CreateActivityContext.Provider
      value={{
        occasion,
        setOccasion,
        dates,
        setDates,
        places,
        setPlaces,
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  );
}

export const useCreateActivityContext = (): CreateActivityContextType =>
  useContext(CreateActivityContext);
