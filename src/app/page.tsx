"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Copy,
  Check,
  Share2,
  ExternalLink,
  MapPin,
  GraduationCap,
  Sparkles,
  Code2,
  FolderGit2,
  Layers,
  Send,
  MessageSquareHeart,
  Globe,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"links" | "stack" | "guestbook">("links");
  const [avatarError, setAvatarError] = useState(false);

  // 미니 방명록 상태 (로컬 스토리지 또는 초기값)
  const [guestMessages, setGuestMessages] = useState<
    { id: string; name: string; message: string; date: string }[]
  >([
    {
      id: "1",
      name: "방문자",
      message: "프로필 사이트 디자인이 정말 깔끔하고 멋져요! 화이팅입니다 👏",
      date: "방금 전",
    },
    {
      id: "2",
      name: "동료 개발자",
      message: "좋은 프로젝트 많이 만들어주세요! 응원합니다.",
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
    { name: "Next.js", category: "Framework", color: "from-zinc-700 to-zinc-900" },
    { name: "React 19", category: "Library", color: "from-sky-500 to-blue-600" },
    { name: "TypeScript", category: "Language", color: "from-blue-600 to-indigo-600" },
    { name: "Tailwind CSS", category: "Styling", color: "from-cyan-500 to-teal-500" },
    { name: "Python", category: "Language", color: "from-yellow-500 to-amber-600" },
    { name: "C / System", category: "Language", color: "from-slate-600 to-zinc-700" },
    { name: "Git & GitHub", category: "DevOps", color: "from-orange-500 to-red-500" },
  ];

  const featuredProjects = [
    {
      title: "MyLink",
      desc: "Next.js 16과 Tailwind CSS로 구축한 개인 맞춤형 Link-in-bio & 프로필 웹앱",
      badge: "Main Project",
      url: "https://github.com/minhijk/my-link",
      tech: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      title: "PCAP-Programming",
      desc: "네트워크 패킷 캡처 및 프로토콜 구조 분석 도구",
      badge: "Network & Security",
      url: "https://github.com/minhijk/PCAP-Programming",
      tech: ["C", "Network", "Pcap"],
    },
    {
      title: "smu-project",
      desc: "컴퓨터소프트웨어 학부 과제 및 협업 개발 프로젝트 레포지토리",
      badge: "Academic",
      url: "https://github.com/minhijk/smu-project",
      tech: ["Software Eng", "Collab"],
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-10 sm:py-16 overflow-hidden">
      {/* 앰비언트 글로우 배경 (Ambient Glow) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-purple-500/20 blur-[100px] rounded-full dark:from-blue-500/15 dark:via-indigo-500/10 dark:to-purple-500/15 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-1/4 w-[300px] h-[250px] bg-emerald-500/10 blur-[90px] rounded-full -z-10"
      />

      {/* 토스트 알림 (복사 완료) */}
      {copied && (
        <div className="fixed top-20 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/90 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xl backdrop-blur-md text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-200">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>
            {copied === "email"
              ? "이메일 주소가 복사되었습니다!"
              : "페이지 링크가 복사되었습니다!"}
          </span>
        </div>
      )}

      {/* 메인 프로필 카드 */}
      <div className="w-full max-w-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl shadow-blue-500/5 overflow-hidden transition-all">
        {/* 상단 장식 배너 */}
        <div className="relative h-32 sm:h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/20" />
          
          {/* 공유 버튼 */}
          <button
            onClick={handleShare}
            type="button"
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/25 hover:bg-black/40 text-white backdrop-blur-md text-xs font-medium border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="프로필 공유하기"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>공유</span>
          </button>
        </div>

        {/* 프로필 본문 */}
        <div className="px-6 sm:px-8 pb-8">
          {/* 아바타 & 상태 */}
          <div className="relative flex items-end justify-between -mt-16 sm:-mt-18 mb-4">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ring-4 ring-white dark:ring-zinc-900 shadow-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold transition-transform duration-300 group-hover:scale-[1.02]">
                {!avatarError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="https://avatars.githubusercontent.com/u/166505760?v=4"
                    alt="Minhyeok Lee Avatar"
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span>이</span>
                )}
              </div>
              {/* 온라인 상태 뱃지 */}
              <div
                className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs"
                title="Available for projects & collaboration"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Active
                </span>
              </div>
            </div>

            {/* 빠른 액션 버튼 (이메일 & 깃허브) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy("166505760+minhijk@users.noreply.github.com", "email")}
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
                title="이메일 복사"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>이메일</span>
                <Copy className="w-3 h-3 opacity-60" />
              </button>

              <a
                href="https://github.com/minhijk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-xs"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* 이름 & 아이덴티티 */}
          <div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                이민혁
              </h1>
              <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Minhyeok Lee
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                @minhijk
              </span>
            </div>

            {/* 메인 직군 뱃지 */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-500/20 dark:via-indigo-500/20 dark:to-purple-500/20 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>웹 개발자 · Software Engineer</span>
            </div>

            {/* 소개글 */}
            <p className="mt-3.5 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed break-keep font-normal">
              직관적인 사용자 경험과 깔끔한 코드를 고민하는 개발자입니다. 배움을 즐기며 일상에 실질적인 가치를 더하는 웹 서비스를 만들어가고 있습니다.
            </p>

            {/* 메타 인포 칩들 */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-800">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                Seoul, Korea
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-800">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                상명대학교 (컴퓨터과학)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-800">
                <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                Web & Security
              </span>
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <div className="mt-7 border-b border-zinc-200 dark:border-zinc-800 flex gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab("links")}
              type="button"
              className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "links"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                  : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>링크 & 프로젝트</span>
            </button>
            <button
              onClick={() => setActiveTab("stack")}
              type="button"
              className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "stack"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                  : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>기술 스택</span>
            </button>
            <button
              onClick={() => setActiveTab("guestbook")}
              type="button"
              className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "guestbook"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                  : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>응원 한마디</span>
            </button>
          </div>

          {/* 탭 1: 링크 & 프로젝트 */}
          {activeTab === "links" && (
            <div className="mt-6 space-y-3">
              {/* 내 링크 모음 전체보기 배너 카드 */}
              <Link
                href="/links"
                className="group relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      내 링크 모음 (Link-in-Bio) 보러가기
                    </h3>
                    <p className="text-xs text-blue-100">
                      카테고리별 유용한 링크와 작업물들을 한눈에 확인하세요
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </Link>

              {/* GitHub 바로가기 카드 */}
              <a
                href="https://github.com/minhijk"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-800/40 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center shadow-xs">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                        GitHub Profile
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-mono">
                        @minhijk
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      오픈소스 기여 및 프로젝트 저장소 둘러보기
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* 대표 프로젝트 섹션 */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Featured Projects
                </span>
                <div className="mt-2 space-y-2.5">
                  {featuredProjects.map((p) => (
                    <a
                      key={p.title}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3.5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-white dark:hover:bg-zinc-850 hover:border-blue-300 dark:hover:border-blue-900 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {p.title}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40 font-medium">
                            {p.badge}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1">
                        {p.desc}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 탭 2: 기술 스택 */}
          {activeTab === "stack" && (
            <div className="mt-6 space-y-5">
              <div>
                <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                  Core Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:scale-105"
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${tech.color}`}
                      />
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                        {tech.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800/80">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <Terminal className="w-3.5 h-3.5 text-blue-500" />
                  <span>개발 가치관 & 철학</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed break-keep">
                  복잡한 로직일수록 단순하고 명료하게 분리하며, 사용자가 체감하는 반응 속도와 접근성을 중요하게 생각합니다. 새로운 기술 스택을 두려워하지 않고 실무 적용성을 고민합니다.
                </p>
              </div>
            </div>
          )}

          {/* 탭 3: 응원 한마디 (방명록) */}
          {activeTab === "guestbook" && (
            <div className="mt-6 space-y-4">
              <form onSubmit={handleAddMessage} className="space-y-2.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="작성자 이름 (기본값: 익명)"
                    className="w-1/3 px-3 py-2 rounded-xl text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="응원의 한마디를 남겨주세요!"
                    required
                    className="flex-1 px-3 py-2 rounded-xl text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1 transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <Send className="w-3 h-3" />
                    <span>등록</span>
                  </button>
                </div>
              </form>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {guestMessages.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-800/30 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-zinc-400">{item.date}</span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 break-keep">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
