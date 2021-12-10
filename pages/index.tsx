import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Layout from "../components/Layout";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <Layout
      title="Find the perfect time to bring everyone together."
      subtitle="Useful for planning trips with friends, big dinners, team events at work, etc."
    >
      <Link href={user ? "/what" : "/login"}>
        <button className="mt-6 flex items-center bg-gray-600 text-white italic py-2 px-4 ml-auto text-lg disabled:cursor-not-allowed disabled:text-gray-500">
          <span className="mr-1">propose times</span>
          <ChevronDoubleRightIcon className="h-5 w-5" />
        </button>
      </Link>
    </Layout>
  );
}
