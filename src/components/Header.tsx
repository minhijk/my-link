"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { GithubIcon } from "./Icons";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "홈", href: "/" },
    { name: "내 링크", href: "/links" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-14 sm:h-16 bg-white/95 dark:bg-[#14171d]/95 backdrop-blur-md border-b border-[#e5e8eb] dark:border-[#2c2c35] transition-colors">
      <div className="max-w-xl mx-auto px-5 h-full flex items-center justify-between">
        {/* Brand Logo - TDS Style Minimal Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-[10px] bg-[#3182f6] flex items-center justify-center text-white font-bold text-sm shadow-xs">
            M
          </div>
          <span className="font-bold text-[17px] tracking-tight text-[#191f28] dark:text-[#ffffff]">
            MyLink
          </span>
        </Link>

        {/* Navigation - TDS Tab style */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full text-[14px] font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-[#e8f3ff] text-[#3182f6] dark:bg-[#1c2638] dark:text-[#3485fa]"
                    : "text-[#6b7684] hover:text-[#191f28] dark:text-[#9e9ea4] dark:hover:text-white hover:bg-[#f2f4f6] dark:hover:bg-[#202027]"
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
            aria-label="GitHub 프로필"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f2f4f6] dark:bg-[#202027] text-[#4e5968] dark:text-[#c3c3c6] hover:text-[#191f28] dark:hover:text-white border border-[#e5e8eb] dark:border-[#2c2c35] active:scale-95 transition-all duration-200"
          >
            <GithubIcon className="w-4 h-4 fill-current" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
