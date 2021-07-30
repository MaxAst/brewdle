import { FC, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

type VoteOption = {
  name: string;
  link?: string;
};

type VoteProps = {
  title: string;
  options: VoteOption[];
};

const Vote: FC<VoteProps> = ({ title, options }) => {
  const [votes, setVotes] = useState<string[]>();

  const handleVote = (optionName: string) => {
    if (votes?.includes(optionName)) {
      setVotes(votes.filter((o) => o !== optionName));
    } else {
      setVotes((votes) => (votes ? [...votes, optionName] : [optionName]));
    }
  };

  return (
    <div className="mb-2 bg-black p-4 text-white">
      <h3 className="mb-4 text-2xl">{title}</h3>
      <ul>
        {options?.map((option) => (
          <li
            key={option.name}
            className={`flex items-center justify-between border-white border-2 px-4 py-2 text-xl sm:text-3xl mb-2 last:mb-0 hover:cursor-pointer ${
              votes?.includes(option.name) ? `bg-white text-black` : ""
            }`}
            onClick={() => handleVote(option.name)}
          >
            {option.link ? (
              <a
                className="hover:underline"
                href={
                  option.link?.includes("http")
                    ? option.link
                    : `https://${option.link}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {option.name}
              </a>
            ) : (
              option.name
            )}
            {votes?.includes(option.name) && (
              <CheckCircleIcon className="h-8 w-8" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vote;
