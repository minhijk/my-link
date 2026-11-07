export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e5e8eb] dark:border-[#2c2c35] bg-[#f9fafb] dark:bg-[#14171d] py-8 text-center text-[13px] text-[#8b95a1] dark:text-[#7e7e87] transition-colors">
      <div className="max-w-xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 font-normal">
          <span>개발자</span>
          <a
            href="https://github.com/minhijk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#4e5968] dark:text-[#c3c3c6] hover:text-[#3182f6] dark:hover:text-[#3485fa] transition-colors"
          >
            이민혁
          </a>
          <span>이 만들었어요.</span>
        </div>

        <div className="flex items-center gap-3 text-[12px]">
          <span>&copy; {new Date().getFullYear()} MyLink</span>
          <span className="text-[#d1d6db] dark:text-[#4d4d59]">·</span>
          <a
            href="https://github.com/minhijk/my-link"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#191f28] dark:hover:text-white transition-colors"
          >
            저장소 보기
          </a>
        </div>
      </div>
    </footer>
  );
}
