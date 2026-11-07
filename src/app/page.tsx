"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Copy,
  Check,
  Share2,
  ChevronRight,
  MapPin,
  GraduationCap,
  Sparkles,
  Layers,
  Send,
  MessageSquare,
  Globe,
  FolderGit2,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "stack" | "guestbook">("projects");
  const [avatarError, setAvatarError] = useState(false);

  // 방명록 상태
  const [guestMessages, setGuestMessages] = useState<
    { id: string; name: string; message: string; date: string }[]
  >([
    {
      id: "1",
      name: "동료 개발자",
      message: "화면이 정말 깔끔하고 정갈해서 보기 편해요! 응원해요.",
      date: "오늘",
    },
    {
      id: "2",
      name: "방문자",
      message: "좋은 프로젝트 많이 만들어주세요. 계속 지켜볼게요!",
      date: "어제",
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "이민혁 | 개발자 프로필",
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy(window.location.href, "share");
    }
  };

  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const item = {
      id: Date.now().toString(),
      name: newName.trim() || "익명",
      message: newMessage.trim(),
      date: "방금 전",
    };
    setGuestMessages([item, ...guestMessages]);
    setNewName("");
    setNewMessage("");
  };

  const techStack = [
    { name: "Next.js", category: "프레임워크" },
    { name: "React", category: "라이브러리" },
    { name: "TypeScript", category: "언어" },
    { name: "Tailwind CSS", category: "스타일링" },
    { name: "Python", category: "언어" },
    { name: "C / 시스템", category: "언어" },
    { name: "Git & GitHub", category: "협업 도구" },
  ];

  const featuredProjects = [
    {
      id: "mylink",
      title: "MyLink",
      category: "개인 프로젝트",
      desc: "Next.js 16과 Tailwind CSS로 구현한 개인 링크 모음 웹앱",
      badge: "대표 프로젝트",
      url: "https://github.com/minhijk/my-link",
      initial: "M",
    },
    {
      id: "pcap",
      title: "PCAP-Programming",
      category: "네트워크 & 보안",
      desc: "C 언어 기반 네트워크 패킷 캡처 및 프로토콜 분석 도구",
      badge: "시스템",
      url: "https://github.com/minhijk/PCAP-Programming",
      initial: "P",
    },
    {
      id: "smu",
      title: "smu-project",
      category: "학업 및 협업",
      desc: "소프트웨어 학부 알고리즘 및 팀 프로젝트 저장소",
      badge: "팀 프로젝트",
      url: "https://github.com/minhijk/smu-project",
      initial: "S",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#f2f4f6] dark:bg-[#0f1015] px-4 py-6 sm:py-10 flex flex-col items-center">
      {/* TDS Toast - grey-900 표면 + green-500 체크 아이콘 */}
      {copied && (
        <div className="fixed top-20 z-50 flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[#191f28] text-white shadow-[0_8px_24px_rgba(25,31,40,0.16)] text-[14px] font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#04b069] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
          <span>
            {copied === "email"
              ? "이메일 주소를 복사했어요."
              : "프로필 링크를 복사했어요."}
          </span>
        </div>
      )}

      <div className="w-full max-w-xl space-y-3.5">
        {/* 1. 프로필 요약 카드 (TDS Primary Card) */}
        <section className="bg-white dark:bg-[#14171d] rounded-[24px] p-6 sm:p-7 border border-[#e5e8eb] dark:border-[#2c2c35] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* 둥근 아바타 (TDS radius-2xl: 20px) */}
              <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-[20px] bg-[#e8f3ff] dark:bg-[#1c2638] flex items-center justify-center text-[#3182f6] font-bold text-2xl overflow-hidden shrink-0 border border-[#e5e8eb] dark:border-[#2c2c35]">
                {!avatarError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="https://avatars.githubusercontent.com/u/166505760?v=4"
                    alt="이민혁 프로필"
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span>이</span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[22px] sm:text-[24px] font-bold text-[#191f28] dark:text-[#ffffff] tracking-tight">
                    이민혁
                  </h1>
                  <span className="text-[13px] font-medium px-2 py-0.5 rounded-full bg-[#f2f4f6] dark:bg-[#202027] text-[#6b7684] dark:text-[#9e9ea4]">
                    @minhijk
                  </span>
                </div>
                <p className="mt-0.5 text-[14px] text-[#4e5968] dark:text-[#c3c3c6] font-medium">
                  웹 개발자 · Software Engineer
                </p>
              </div>
            </div>

            {/* 상단 공유 버튼 (TDS Ghost icon button) */}
            <button
              onClick={handleShare}
              type="button"
              className="w-9 h-9 rounded-full bg-[#f2f4f6] dark:bg-[#202027] text-[#4e5968] dark:text-[#c3c3c6] hover:text-[#191f28] dark:hover:text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              title="프로필 공유하기"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* 소개글 - 토스 해요체 */}
          <div className="mt-5 pt-5 border-t border-[#f2f4f6] dark:border-[#202027]">
            <p className="text-[15px] sm:text-[16px] text-[#333d4b] dark:text-[#e4e4e5] leading-[1.6] break-keep font-normal">
              직관적인 사용자 경험과 깔끔한 코드를 고민해요. 배움을 즐기며 일상에 가치를 더하는 서비스를 만들고 있어요.
            </p>
          </div>

          {/* 태그 칩 (TDS Chips: 34px full pill) */}
          <div className="mt-4 flex flex-wrap gap-2 text-[13px] text-[#4e5968] dark:text-[#c3c3c6]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f4f6] dark:bg-[#202027] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#3182f6]" />
              서울
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f4f6] dark:bg-[#202027] font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-[#3182f6]" />
              상명대학교 컴퓨터과학
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f3ff] dark:bg-[#1c2638] text-[#3182f6] dark:text-[#3485fa] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              개발 협업 환영
            </span>
          </div>

          {/* 빠른 액션 버튼 2단 (보조 액션: grey-100 채움) */}
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleCopy("166505760+minhijk@users.noreply.github.com", "email")}
              type="button"
              className="h-11 rounded-[14px] bg-[#f2f4f6] hover:bg-[#e5e8eb] dark:bg-[#202027] dark:hover:bg-[#2c2c35] text-[#191f28] dark:text-[#ffffff] text-[14px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#6b7684]" />
              <span>이메일 복사</span>
            </button>

            <a
              href="https://github.com/minhijk"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded-[14px] bg-[#f2f4f6] hover:bg-[#e5e8eb] dark:bg-[#202027] dark:hover:bg-[#2c2c35] text-[#191f28] dark:text-[#ffffff] text-[14px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.98]"
            >
              <GithubIcon className="w-4 h-4 fill-current text-[#191f28] dark:text-white" />
              <span>GitHub 가기</span>
            </a>
          </div>
        </section>

        {/* 2. 화면당 단 하나의 Toss Blue 강조 CTA (Primary Button) */}
        <Link
          href="/links"
          className="group w-full h-14 rounded-[16px] bg-[#3182f6] hover:bg-[#1b64da] dark:bg-[#3485fa] dark:hover:bg-[#2b70d4] text-white px-5 flex items-center justify-between font-semibold text-[16px] shadow-[0_4px_12px_rgba(49,130,246,0.25)] transition-all duration-150 active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-white/90" />
            <span>내 링크 모음 보기</span>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* 3. TDS Segmented Control & 콘텐츠 섹션 */}
        <section className="bg-white dark:bg-[#14171d] rounded-[24px] p-5 sm:p-6 border border-[#e5e8eb] dark:border-[#2c2c35] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          {/* Segmented Control (토스 분절 컨트롤: grey-100 트랙 + 흰색 분절) */}
          <div className="p-1 rounded-[14px] bg-[#f2f4f6] dark:bg-[#202027] grid grid-cols-3 gap-1 text-[13px] sm:text-[14px]">
            <button
              onClick={() => setActiveTab("projects")}
              type="button"
              className={`py-2 rounded-[10px] font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === "projects"
                  ? "bg-white dark:bg-[#14171d] text-[#191f28] dark:text-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-[#6b7684] dark:text-[#9e9ea4] hover:text-[#191f28] dark:hover:text-white"
              }`}
            >
              주요 프로젝트
            </button>
            <button
              onClick={() => setActiveTab("stack")}
              type="button"
              className={`py-2 rounded-[10px] font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === "stack"
                  ? "bg-white dark:bg-[#14171d] text-[#191f28] dark:text-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-[#6b7684] dark:text-[#9e9ea4] hover:text-[#191f28] dark:hover:text-white"
              }`}
            >
              기술 스택
            </button>
            <button
              onClick={() => setActiveTab("guestbook")}
              type="button"
              className={`py-2 rounded-[10px] font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === "guestbook"
                  ? "bg-white dark:bg-[#14171d] text-[#191f28] dark:text-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-[#6b7684] dark:text-[#9e9ea4] hover:text-[#191f28] dark:hover:text-white"
              }`}
            >
              응원 한마디
            </button>
          </div>

          {/* 탭 1: 주요 프로젝트 (TDS ListRow 패턴) */}
          {activeTab === "projects" && (
            <div className="mt-4 divide-y divide-[#f2f4f6] dark:divide-[#202027]">
              {featuredProjects.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3.5 hover:bg-[#f9fafb] dark:hover:bg-[#18181e] px-2 rounded-[16px] transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    {/* TDS 44px 아바타 슬롯 (radius 14) */}
                    <div className="w-11 h-11 rounded-[14px] bg-[#e8f3ff] dark:bg-[#1c2638] text-[#3182f6] dark:text-[#3485fa] flex items-center justify-center font-bold text-base shrink-0">
                      {p.initial}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[15px] text-[#191f28] dark:text-white truncate">
                          {p.title}
                        </h3>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f2f4f6] dark:bg-[#202027] text-[#6b7684] dark:text-[#9e9ea4] font-medium shrink-0">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#6b7684] dark:text-[#9e9ea4] truncate mt-0.5">
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#b0b8c1] group-hover:text-[#3182f6] group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              ))}
            </div>
          )}

          {/* 탭 2: 기술 스택 (TDS Chip Grid) */}
          {activeTab === "stack" && (
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-3.5 rounded-[16px] bg-[#f9fafb] dark:bg-[#18181e] border border-[#e5e8eb] dark:border-[#2c2c35]"
                  >
                    <span className="text-[11px] font-medium text-[#8b95a1] dark:text-[#7e7e87] block">
                      {tech.category}
                    </span>
                    <span className="text-[14px] font-bold text-[#191f28] dark:text-white mt-0.5 block">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-[16px] bg-[#f2f4f6] dark:bg-[#202027] text-[13px] text-[#4e5968] dark:text-[#c3c3c6] leading-relaxed break-keep">
                <span className="font-bold text-[#191f28] dark:text-white block mb-1">
                  개발할 때 가장 중요하게 생각해요
                </span>
                복잡한 비즈니스 로직도 사용자가 마주할 때는 직관적이고 단순해야 한다고 믿어요. 최신 웹 기술을 실무에 유연하게 녹여내요.
              </div>
            </div>
          )}

          {/* 탭 3: 응원 한마디 (TDS Style Clean Form & List) */}
          {activeTab === "guestbook" && (
            <div className="mt-5 space-y-4">
              <form onSubmit={handleAddMessage} className="space-y-2.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="이름"
                    className="w-1/3 h-11 px-3.5 rounded-[12px] text-[13px] bg-[#f2f4f6] dark:bg-[#202027] border border-[#e5e8eb] dark:border-[#2c2c35] text-[#191f28] dark:text-white placeholder:text-[#8b95a1] focus:outline-none focus:border-[#3182f6] focus:bg-white dark:focus:bg-[#14171d] transition-colors"
                  />
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="응원 메시지를 남겨주세요."
                    required
                    className="flex-1 h-11 px-3.5 rounded-[12px] text-[13px] bg-[#f2f4f6] dark:bg-[#202027] border border-[#e5e8eb] dark:border-[#2c2c35] text-[#191f28] dark:text-white placeholder:text-[#8b95a1] focus:outline-none focus:border-[#3182f6] focus:bg-white dark:focus:bg-[#14171d] transition-colors"
                  />
                  <button
                    type="submit"
                    className="h-11 px-4 rounded-[12px] bg-[#3182f6] hover:bg-[#1b64da] text-white text-[13px] font-semibold shrink-0 transition-colors active:scale-95 cursor-pointer"
                  >
                    등록
                  </button>
                </div>
              </form>

              <div className="space-y-2 pt-1 max-h-60 overflow-y-auto">
                {guestMessages.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-[16px] bg-[#f9fafb] dark:bg-[#18181e] border border-[#e5e8eb] dark:border-[#2c2c35]"
                  >
                    <div className="flex items-center justify-between text-[12px] mb-1">
                      <span className="font-bold text-[#191f28] dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-[#8b95a1]">{item.date}</span>
                    </div>
                    <p className="text-[13px] text-[#4e5968] dark:text-[#c3c3c6] break-keep">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
