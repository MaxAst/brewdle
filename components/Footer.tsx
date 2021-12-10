export default function Footer() {
  return (
    <footer className="bg-gray-100 row-auto flex items-center px-2 sm:px-6 italic">
      <div>
        <p className="text-gray-400 text-xs">
          © Copyright {new Date().getFullYear()} Camarelle Ventures GmbH.
        </p>
        <p className="text-gray-400 text-xs">All rights reserved.</p>
      </div>
    </footer>
  );
}
