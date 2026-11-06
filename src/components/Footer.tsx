import { Heart } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 dark:border-zinc-800/80 py-8 text-center text-sm text-zinc-500 dark:text-zinc-500 transition-colors">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          <span>by</span>
          <a
            href="https://github.com/minhijk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
          >
            Minhyeok Lee
          </a>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span>&copy; {new Date().getFullYear()} MyLink. MIT Licensed.</span>
          <a
            href="https://github.com/minhijk/my-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
