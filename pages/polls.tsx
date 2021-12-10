import Link from "next/link";
import Layout from "../components/Layout";
import usePolls from "../hooks/usePolls";

export default function Polls() {
  const polls = usePolls();

  return (
    <Layout title="Polls" subtitle="All your polls">
      {polls && (
        <div className="mb-4 bg-black px-4 py-5 text-white">
          <ul>
            {polls.map((poll) => (
              <li key={poll.id}>
                <Link href={`poll/${poll.id}`}>{poll.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
}
