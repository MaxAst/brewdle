import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { definitions } from "../types/supabase";

export default function useVotes(dateId: number) {
  const [votes, setVotes] = useState<definitions["votes"][]>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchVotes = async () => {
      if (!dateId) return;
      const { data, error, count } = await supabase
        .from<definitions["votes"]>("votes")
        .select("*", { count: "exact" })
        .eq("date_id", dateId);

      if (error) {
        console.error(error);
      }
      if (count) {
        setCount(count);
      }
      if (data) {
        setVotes(data);
      }
    };
    fetchVotes();
  }, [dateId]);

  useEffect(() => {
    if (!dateId) return;
    const votes = supabase
      .from(`votes:date_id=eq.${dateId}`)
      .on("INSERT", (payload) => {
        setCount((c) => c + 1);
        setVotes((v) => (v ? [...v, payload.new] : [payload.new]));
      })
      .on("DELETE", (payload) => {
        setCount((c) => c - 1);
        setVotes((v) => v?.filter((v) => v.id !== payload.old.id));
      })
      .subscribe();
    return () => {
      votes.unsubscribe();
    };
  }, [dateId]);

  return { votes, count };
}
