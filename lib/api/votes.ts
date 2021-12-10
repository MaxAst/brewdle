import { definitions } from "../../types/supabase";
import { supabase } from "../supabase";

export const userHasVotedOnThis = async ({
  userId,
  dateId,
}: {
  userId: string;
  dateId: number;
}) => {
  const { error, count } = await supabase
    .from<definitions["votes"]>("votes")
    .select("*", { count: "exact", head: true })
    .eq("date_id", dateId)
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    return;
  }
  return count === 1;
};

export const toggleVote = async ({
  userId,
  fullName,
  dateId,
}: {
  userId: string;
  fullName: string;
  dateId: number;
}) => {
  const voted = await userHasVotedOnThis({ userId, dateId });
  if (voted) {
    const { data, error } = await supabase
      .from<definitions["votes"]>("votes")
      .delete()
      .match({ user_id: userId })
      .match({ date_id: dateId });
    if (error) {
      console.error(error);
      return;
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from<definitions["votes"]>("votes")
      .insert([{ voter: fullName, date_id: dateId, user_id: userId }]);
    if (error) {
      console.error(error);
      return;
    }
    return data;
  }
};
