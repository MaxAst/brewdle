import { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import { CheckCircleIcon } from "@heroicons/react/solid";
import useVotes from "../hooks/useVotes";
import { useAuthContext } from "../context/AuthContext";
import { toggleVote, userHasVotedOnThis } from "../lib/api/votes";

type VoteProps = {
  value: string;
  dateId: number;
  link?: string;
};

const Vote: FC<VoteProps> = ({ value, dateId, link }) => {
  const { user } = useAuthContext();
  const { votes, count } = useVotes(dateId);
  const hasVoted = votes?.some((v) => v.user_id === user?.id);

  const handleVote = async () => {
    if (user) {
      await toggleVote({
        userId: user.id,
        fullName: user.user_metadata.full_name,
        dateId,
      });
    }
  };

  if (!user) return null;

  return (
    <li className="h-14 grid grid-cols-12 gap-x-2 text-2xl sm:text-3xl mb-3 last:mb-0">
      <p
        className={`relative col-span-9 flex items-center w-full h-full border-white border-2 px-4 py-2 hover:cursor-pointer ${
          hasVoted ? `bg-white text-black` : ""
        }`}
        onClick={handleVote}
      >
        {link ? (
          <a
            className="hover:underline"
            href={link?.includes("http") ? link : `https://${link}`}
            target="_blank"
            rel="noreferrer"
          >
            {value}
          </a>
        ) : (
          format(new Date(value), "do MMM, yyyy")
        )}
        {hasVoted && (
          <CheckCircleIcon className="absolute -top-3 -right-4 h-8 w-8 bg-black text-green-400 rounded-full" />
        )}
      </p>
      <p className="ml-auto col-span-3 flex items-center text-xl sm:text-3xl hover:underline hover:cursor-pointer">
        {count} votes
      </p>
    </li>
  );
};

export default Vote;
