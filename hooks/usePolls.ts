import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { definitions } from "../types/supabase";

export default function usePoll() {
  const [polls, setPolls] = useState<definitions["polls"][]>();

  useEffect(() => {
    const fetchPolls = async () => {
      const { data, error } = await supabase
        .from<definitions["polls"]>("polls")
        .select("*");

      if (error) {
        console.error(error);
      }
      if (data) {
        setPolls(data);
      }
    };
    fetchPolls();
  }, []);

  return polls;
}
