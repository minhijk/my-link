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
    <header className="sticky top-0 z-50 w-full h-14 sm:h-16 bg-card/90 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-xl mx-auto px-3.5 sm:px-5 h-full flex items-center justify-between">
        {/* Brand Logo - TDS Style Minimal Brand */}
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer shrink-0"
        >
          <div className="w-7 h-7 rounded-[10px] bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-xs">
            M
          </div>
          <span className="font-bold text-[16px] sm:text-[17px] tracking-tight text-foreground">
            MyLink
          </span>
        </Link>

        {/* Navigation - TDS Tab style */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-accent text-accent-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href="https://github.com/minhijk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 프로필"
            className="flex items-center justify-center size-8 sm:size-9 rounded-full bg-secondary text-muted-foreground hover:text-foreground border border-border active:scale-95 transition-all duration-150"
          >
            <GithubIcon className="size-3.5 sm:size-4 fill-current" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
