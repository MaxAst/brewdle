import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { definitions } from "../types/supabase";

export default function usePoll() {
  const router = useRouter();

  const [poll, setPoll] = useState<
    definitions["polls"] & { dates: { id: number; value: string }[] }
  >();

  useEffect(() => {
    const fetchPoll = async () => {
      if (!router.query.id) return;
      const { data, error } = await supabase
        .from<
          definitions["polls"] & { dates: { id: number; value: string }[] }
        >("polls")
        .select(
          `
          name,
          dates (
            id,
            value
          )
        `
        )
        .eq("id", router.query.id as string);

      if (error) {
        console.error(error);
      }
      if (data) {
        setPoll(data[0]);
      }
    };
    fetchPoll();
  }, [router.query]);

  return poll;
}
