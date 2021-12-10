import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import Menu from "./Menu";

export default function Header() {
  const { user } = useAuthContext();
  return (
    <header className="p-2 flex items-center row-auto">
      <Link href="/">
        <a href="/">
          <p className="text-3xl font-bold flex items-center">
            <span className="text-4xl mr-1">🐩</span>
            <span className="italic">poodle</span>
          </p>
          <p className="text-sm italic">easy scheduling for groups</p>
        </a>
      </Link>
      {user && <Menu />}
    </header>
  );
}
