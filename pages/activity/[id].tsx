import React from "react";
import { useCreateActivityContext } from "../../context/CreateActivityContext";
import Layout from "../../components/Layout";
import Vote from "../../components/Vote";

export default function Activity() {
  const { occasion, dates, places } = useCreateActivityContext();

  return (
    <Layout title={occasion}>
      {dates && (
        <Vote
          title="vote for dates:"
          options={dates?.map((date) => ({ name: date }))}
        />
      )}
      {places && <Vote title="vote for a place:" options={places} />}
    </Layout>
  );
}
