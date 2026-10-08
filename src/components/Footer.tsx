export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-sm text-zinc-500">
      <div className="max-w-5xl mx-auto px-4">
        &copy; {new Date().getFullYear()} MyLink. All rights reserved.
      </div>
    </footer>
  );
}
