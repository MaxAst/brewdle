import Layout from "../../components/Layout";
import Vote from "../../components/Vote";
import usePoll from "../../hooks/usePoll";

export default function Poll() {
  const poll = usePoll();

  return (
    <Layout
      title={poll?.name ?? ""}
      subtitle="Vote on the dates that suit you:"
    >
      {poll && poll.dates && (
        <div className="mb-4 bg-black px-4 py-5 text-white">
          <ul>
            {poll.dates?.map((date) => (
              <Vote key={date.id} value={date.value} dateId={date.id} />
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
}
