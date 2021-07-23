import React, { createContext, useContext, useState } from "react";

type CreateActivityContextType = {
  occasion: string;
  setOccasion: React.Dispatch<React.SetStateAction<string>>;
  dates?: string[];
  setDates: React.Dispatch<React.SetStateAction<string[] | undefined>>;
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

  return (
    <CreateActivityContext.Provider
      value={{
        occasion: occasion,
        setOccasion: setOccasion,
        dates: dates,
        setDates: setDates,
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  );
}

export const useCreateActivityContext = (): CreateActivityContextType =>
  useContext(CreateActivityContext);
