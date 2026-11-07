"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-[#f2f4f6] dark:bg-[#202027] border border-[#e5e8eb] dark:border-[#2c2c35]" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="화면 모드 전환"
      className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f2f4f6] dark:bg-[#202027] text-[#4e5968] dark:text-[#c3c3c6] hover:text-[#191f28] dark:hover:text-white border border-[#e5e8eb] dark:border-[#2c2c35] active:scale-95 transition-all duration-200 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-[#ffc342]" />
      ) : (
        <Moon className="w-4 h-4 text-[#4e5968]" />
      )}
    </button>
  );
}
