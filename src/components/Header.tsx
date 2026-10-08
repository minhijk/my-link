import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="text-blue-600 dark:text-blue-400">My</span>Link
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
            홈
          </Link>
          <Link href="/links" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
            내 링크
          </Link>
        </nav>
      </div>
    </header>
  );
}
