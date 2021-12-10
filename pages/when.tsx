import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useCreatePollContext } from "../context/CreatePollContext";
import Calendar from "../components/Calendar";
import Layout from "../components/Layout";
import { useAuthContext } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { definitions } from "../types/supabase";

export default function When() {
  const router = useRouter();
  const { occasion, dates } = useCreatePollContext();
  const { user } = useAuthContext();

  const routeChangeAfterSubmission = async () => {
    if (user && dates) {
      const { data: polls, error: pollsError } = await supabase
        .from<definitions["polls"]>("polls")
        .insert([{ name: occasion, created_by: user.id }]);

      if (pollsError) {
        console.error(pollsError);
        return;
      }

      const pollId = polls?.[0].id;

      if (!pollId) {
        console.error("Failed to create poll.");
        return;
      }

      for (const date of dates) {
        const { error: datesError } = await supabase
          .from("dates")
          .insert([{ value: date, poll_id: pollId }]);

        if (datesError) {
          console.error(datesError);
          return;
        }
      }

      router.push(`/poll/${pollId}`);
    } else {
      router.push("/login");
    }
  };

  const handleDatesSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    await routeChangeAfterSubmission();
  };

  useEffect(() => {
    const listener = async (event: any) => {
      if (event.code === "Enter" && event.metaKey) {
        event.preventDefault();
        await routeChangeAfterSubmission();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [router]);

  return (
    <Layout
      title="When?"
      subtitle="Select all dates that come into questions. You and the others will be able to vote on them."
    >
      <div className="mb-4 p-3 outline-none appearance-none bg-black text-white w-full text-6xl">
        <Calendar />
      </div>
      <button
        className="flex items-center bg-gray-600 text-white italic py-2 px-4 ml-auto text-lg disabled:cursor-not-allowed disabled:text-gray-500"
        disabled={!dates || dates.length === 0}
        onClick={handleDatesSubmission}
      >
        <span className="mr-1">create poll</span>
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
    </Layout>
  );
}
