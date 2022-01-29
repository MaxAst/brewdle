import { FC, useState } from "react";
import { format } from "date-fns";
import { CheckCircleIcon } from "@heroicons/react/solid";
import useVotes from "../hooks/useVotes";
import { useAuthContext } from "../context/AuthContext";
import { toggleVote } from "../lib/api/votes";
import VotersModal from "./VotersModal";

type VoteProps = {
  value: string;
  dateId: number;
  link?: string;
};

const Vote: FC<VoteProps> = ({ value, dateId, link }) => {
  const [votersModalIsOpen, setVotersModalIsOpen] = useState(false);
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

  const closeModal = () => {
    setVotersModalIsOpen(false);
  };

  const openModal = () => {
    if (votes?.length) {
      setVotersModalIsOpen(true);
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
      <button
        type="button"
        onClick={openModal}
        className="ml-auto col-span-3 flex items-center text-xl sm:text-3xl hover:underline hover:cursor-pointer"
      >
        {count} votes
      </button>
      <VotersModal
        isOpen={votersModalIsOpen}
        closeModal={closeModal}
        votes={votes}
        date={format(new Date(value), "do MMM, yyyy")}
      />
    </li>
  );
};

export default Vote;
