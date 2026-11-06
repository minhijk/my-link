"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { GithubIcon } from "./Icons";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "홈", href: "/" },
    { name: "내 링크", href: "/links" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/75 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/75 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xs shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-zinc-900 dark:text-zinc-50 font-semibold">
            My<span className="text-blue-600 dark:text-blue-400">Link</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 font-semibold"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/60 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/60"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/minhijk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 프로필로 이동"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 active:scale-95 transition-all shadow-xs"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
