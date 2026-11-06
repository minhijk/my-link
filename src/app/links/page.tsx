"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  ExternalLink,
  Copy,
  Check,
  Star,
  Globe,
  FolderGit2,
  BookOpen,
  Sparkles,
  Trash2,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface CustomLink {
  id: string;
  title: string;
  url: string;
  category: "project" | "dev" | "social" | "study";
  desc: string;
  isStarred?: boolean;
}

const INITIAL_LINKS: CustomLink[] = [
  {
    id: "1",
    title: "GitHub Profile (@minhijk)",
    url: "https://github.com/minhijk",
    category: "social",
    desc: "오픈소스 기여, 개인 프로젝트 저장소 및 잔디 활동",
    isStarred: true,
  },
  {
    id: "2",
    title: "MyLink (마이링크)",
    url: "https://github.com/minhijk/my-link",
    category: "project",
    desc: "Next.js 16과 Tailwind CSS로 구현된 개인 링크 모음 웹 애플리케이션",
    isStarred: true,
  },
  {
    id: "3",
    title: "PCAP-Programming",
    url: "https://github.com/minhijk/PCAP-Programming",
    category: "project",
    desc: "C 기반 네트워크 패킷 캡처 및 프로토콜 분석 프로젝트",
  },
  {
    id: "4",
    title: "smu-project",
    url: "https://github.com/minhijk/smu-project",
    category: "study",
    desc: "상명대학교 전공 과제 및 소프트웨어 협업 프로젝트",
  },
  {
    id: "5",
    title: "Next.js Official Documentation",
    url: "https://nextjs.org/docs",
    category: "dev",
    desc: "App Router 및 풀스택 웹 개발 공식 레퍼런스",
  },
  {
    id: "6",
    title: "Tailwind CSS v4 Reference",
    url: "https://tailwindcss.com/docs",
    category: "dev",
    desc: "유틸리티 기반의 최신 모던 스타일링 프레임워크 문서",
  },
];

export default function LinksPage() {
  const [links, setLinks] = useState<CustomLink[]>(INITIAL_LINKS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // 새 링크 폼 상태
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState<"project" | "dev" | "social" | "study">("project");

  const categories = [
    { id: "all", label: "전체보기" },
    { id: "project", label: "프로젝트" },
    { id: "dev", label: "개발 도구/문서" },
    { id: "study", label: "학업/스터디" },
    { id: "social", label: "소셜" },
  ];

  const handleCopy = (id: string, url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, isStarred: !link.isStarred } : link
      )
    );
  };

  const deleteLink = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLinks(links.filter((l) => l.id !== id));
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    let formattedUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }

    const newLinkItem: CustomLink = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      url: formattedUrl,
      desc: newDesc.trim() || formattedUrl,
      category: newCategory,
      isStarred: false,
    };

    setLinks([newLinkItem, ...links]);
    setNewTitle("");
    setNewUrl("");
    setNewDesc("");
    setShowAddModal(false);
  };

  const filteredLinks = links.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase()) ||
      item.url.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case "project":
        return { label: "프로젝트", color: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/40" };
      case "dev":
        return { label: "개발 도구", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40" };
      case "study":
        return { label: "학업/스터디", color: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40" };
      case "social":
        return { label: "소셜", color: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40" };
      default:
        return { label: "기타", color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700" };
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "project":
        return <FolderGit2 className="w-4 h-4 text-blue-500" />;
      case "dev":
        return <Globe className="w-4 h-4 text-emerald-500" />;
      case "study":
        return <BookOpen className="w-4 h-4 text-purple-500" />;
      case "social":
        return <GithubIcon className="w-4 h-4 text-amber-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* 앰비언트 블러 배경 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-[100px] rounded-full -z-10"
      />

      <div className="w-full max-w-2xl">
        {/* 상단 네비게이션 & 헤더 */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>프로필로 돌아가기</span>
          </Link>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>새 링크 추가</span>
          </button>
        </div>

        {/* 타이틀 영역 */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            내 링크 모음
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            개발 활동, 주요 프로젝트 및 자주 찾는 유용한 웹사이트 목록입니다.
          </p>
        </div>

        {/* 새 링크 추가 모달 / 인라인 카드 */}
        {showAddModal && (
          <form
            onSubmit={handleAddLink}
            className="mb-6 p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-blue-200 dark:border-blue-900 shadow-xl backdrop-blur-md space-y-3 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>새 링크 등록</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                닫기
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="링크 제목 (예: My Portfolio)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="px-3.5 py-2 rounded-xl text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="URL (예: https://...)"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
                className="px-3.5 py-2 rounded-xl text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="간단한 설명 (선택)"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="px-3.5 py-2 rounded-xl text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="px-3.5 py-2 rounded-xl text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="project">프로젝트</option>
                <option value="dev">개발 도구/문서</option>
                <option value="study">학업/스터디</option>
                <option value="social">소셜</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs"
              >
                링크 저장하기
              </button>
            </div>
          </form>
        )}

        {/* 검색 및 필터 컨트롤 바 */}
        <div className="space-y-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="링크 제목, 설명 또는 URL 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
            />
          </div>

          {/* 카테고리 필터 태그 */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white shadow-xs font-semibold"
                      : "bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800/80"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 링크 카드 리스트 */}
        <div className="space-y-3">
          {filteredLinks.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40">
              <Sparkles className="w-8 h-8 text-zinc-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                검색 조건에 맞는 링크가 없습니다.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
                className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            filteredLinks.map((item) => {
              const badge = getCategoryBadge(item.category);
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md hover:bg-white dark:hover:bg-zinc-850 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-md hover:shadow-blue-500/5 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3.5 pr-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {item.title}
                        </h3>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                        {item.isStarred && (
                          <span className="flex items-center text-[10px] text-amber-500 font-medium">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {item.desc}
                      </p>
                      <span className="mt-1 inline-block text-[11px] font-mono text-zinc-400 dark:text-zinc-500 truncate max-w-full">
                        {item.url}
                      </span>
                    </div>
                  </div>

                  {/* 호버 액션 툴바 */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => toggleStar(item.id, e)}
                      type="button"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      title="즐겨찾기 토글"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          item.isStarred
                            ? "fill-amber-400 text-amber-400"
                            : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => handleCopy(item.id, item.url, e)}
                      type="button"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      title="URL 복사"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => deleteLink(item.id, e)}
                      type="button"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      title="링크 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-1.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
