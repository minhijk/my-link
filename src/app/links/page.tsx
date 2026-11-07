"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  ChevronRight,
  Copy,
  Check,
  Star,
  Globe,
  FolderGit2,
  BookOpen,
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
    title: "GitHub Profile",
    url: "https://github.com/minhijk",
    category: "social",
    desc: "오픈소스 기여와 프로젝트 저장소, 커밋 활동을 모아봤어요.",
    isStarred: true,
  },
  {
    id: "2",
    title: "MyLink",
    url: "https://github.com/minhijk/my-link",
    category: "project",
    desc: "Next.js 16과 토스 디자인 시스템(TDS)으로 만든 링크 관리 웹앱이에요.",
    isStarred: true,
  },
  {
    id: "3",
    title: "PCAP-Programming",
    url: "https://github.com/minhijk/PCAP-Programming",
    category: "project",
    desc: "C 언어 기반 네트워크 패킷 캡처 및 프로토콜 분석 도구예요.",
  },
  {
    id: "4",
    title: "smu-project",
    url: "https://github.com/minhijk/smu-project",
    category: "study",
    desc: "상명대학교 전공 과제와 알고리즘 협업 프로젝트예요.",
  },
  {
    id: "5",
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    category: "dev",
    desc: "App Router와 최신 웹 개발 공식 가이드 문서예요.",
  },
  {
    id: "6",
    title: "Tailwind CSS 공식 문서",
    url: "https://tailwindcss.com/docs",
    category: "dev",
    desc: "유틸리티 기반 모던 스타일링 레퍼런스예요.",
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
    { id: "all", label: "전체" },
    { id: "project", label: "프로젝트" },
    { id: "dev", label: "개발 도구" },
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
        return { label: "프로젝트", color: "bg-[#e8f3ff] text-[#3182f6] dark:bg-[#1c2638] dark:text-[#3485fa]" };
      case "dev":
        return { label: "개발 도구", color: "bg-[#f2f4f6] text-[#4e5968] dark:bg-[#202027] dark:text-[#c3c3c6]" };
      case "study":
        return { label: "학업", color: "bg-[#f2f4f6] text-[#4e5968] dark:bg-[#202027] dark:text-[#c3c3c6]" };
      case "social":
        return { label: "소셜", color: "bg-[#f2f4f6] text-[#4e5968] dark:bg-[#202027] dark:text-[#c3c3c6]" };
      default:
        return { label: "기타", color: "bg-[#f2f4f6] text-[#4e5968] dark:bg-[#202027] dark:text-[#c3c3c6]" };
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "project":
        return <FolderGit2 className="w-5 h-5 text-[#3182f6]" />;
      case "dev":
        return <Globe className="w-5 h-5 text-[#3182f6]" />;
      case "study":
        return <BookOpen className="w-5 h-5 text-[#3182f6]" />;
      case "social":
        return <GithubIcon className="w-5 h-5 fill-current text-[#3182f6]" />;
      default:
        return <Globe className="w-5 h-5 text-[#3182f6]" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#f2f4f6] dark:bg-[#0f1015] px-4 py-6 sm:py-10 flex flex-col items-center">
      <div className="w-full max-w-xl space-y-3.5">
        {/* 상단 뒤로가기 & 새 링크 등록 */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#6b7684] hover:text-[#191f28] dark:text-[#9e9ea4] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈으로 가기</span>
          </Link>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3182f6] hover:bg-[#1b64da] text-white text-[13px] font-semibold transition-colors active:scale-95 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>새 링크 추가</span>
          </button>
        </div>

        {/* 헤더 섹션 카드 */}
        <section className="bg-white dark:bg-[#14171d] rounded-[24px] p-6 border border-[#e5e8eb] dark:border-[#2c2c35] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#191f28] dark:text-white tracking-tight">
            내 링크 모음
          </h1>
          <p className="mt-1 text-[14px] text-[#6b7684] dark:text-[#9e9ea4]">
            자주 찾는 웹사이트와 주요 프로젝트 목록이에요.
          </p>

          {/* 검색창 (TDS Search-field: 48px height, 12px radius) */}
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b95a1]" />
            <input
              type="text"
              placeholder="링크 제목이나 URL 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-[12px] text-[14px] bg-[#f2f4f6] dark:bg-[#202027] border border-[#e5e8eb] dark:border-[#2c2c35] text-[#191f28] dark:text-white placeholder:text-[#8b95a1] focus:outline-none focus:border-[#3182f6] focus:bg-white dark:focus:bg-[#14171d] transition-all"
            />
          </div>

          {/* 카테고리 칩 (TDS Chips: 34px full pill) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none">
            {categories.map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  type="button"
                  className={`h-[34px] px-3.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    active
                      ? "bg-[#191f28] dark:bg-white text-white dark:text-[#191f28]"
                      : "bg-[#f2f4f6] dark:bg-[#202027] text-[#6b7684] dark:text-[#9e9ea4] hover:bg-[#e5e8eb] dark:hover:bg-[#2c2c35]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 새 링크 등록 모달 폼 */}
        {showAddModal && (
          <form
            onSubmit={handleAddLink}
            className="p-5 rounded-[24px] bg-white dark:bg-[#14171d] border border-[#3182f6] shadow-[0_4px_16px_rgba(49,130,246,0.12)] space-y-3 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#f2f4f6] dark:border-[#202027]">
              <h3 className="text-[15px] font-bold text-[#191f28] dark:text-white">
                새로운 링크를 등록해요
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[13px] text-[#8b95a1] hover:text-[#191f28] dark:hover:text-white"
              >
                닫기
              </button>
            </div>

            <div className="space-y-2.5">
              <input
                type="text"
                placeholder="링크 제목"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-[12px] text-[13px] bg-[#f2f4f6] dark:bg-[#202027] border border-[#e5e8eb] dark:border-[#2c2c35] text-[#191f28] dark:text-white focus:outline-none focus:border-[#3182f6] focus:bg-white dark:focus:bg-[#14171d]"
              />
              <input
                type="text"
                placeholder="URL (https://...)"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-[12px] text-[13px] bg-[#f2f4f6] dark:bg-[#202027] border border-[#e5e8eb] dark:border-[#2c2c35] text-[#191f28] dark:text-white focus:outline-none focus:border-[#3182f6] focus:bg-white dark:focus:bg-[#14171d]"
              />
              <input
                type="text"
                placeholder="설명 (선택)"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full h-11 px-3.5 rounded-[12px] text-[13px] bg-[#f2f4f6] dark:bg-[#202027] border border-[#e5e8eb] dark:border-[#2c2c35] text-[#191f28] dark:text-white focus:outline-none focus:border-[#3182f6] focus:bg-white dark:focus:bg-[#14171d]"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full h-11 px-3.5 rounded-[12px] text-[13px] bg-[#f2f4f6] dark:bg-[#202027] border border-[#e5e8eb] dark:border-[#2c2c35] text-[#191f28] dark:text-white focus:outline-none"
              >
                <option value="project">프로젝트</option>
                <option value="dev">개발 도구</option>
                <option value="study">학업/스터디</option>
                <option value="social">소셜</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="h-10 px-4 rounded-[12px] bg-[#f2f4f6] dark:bg-[#202027] text-[13px] font-semibold text-[#4e5968] dark:text-[#c3c3c6]"
              >
                취소
              </button>
              <button
                type="submit"
                className="h-10 px-4 rounded-[12px] bg-[#3182f6] hover:bg-[#1b64da] text-white text-[13px] font-semibold"
              >
                저장하기
              </button>
            </div>
          </form>
        )}

        {/* 링크 카드 리스트 (TDS ListRow Card) */}
        <section className="bg-white dark:bg-[#14171d] rounded-[24px] p-3 sm:p-4 border border-[#e5e8eb] dark:border-[#2c2c35] shadow-[0_2px_8px_rgba(0,0,0,0.02)] divide-y divide-[#f2f4f6] dark:divide-[#202027]">
          {filteredLinks.length === 0 ? (
            <div className="py-12 text-center text-[14px] text-[#8b95a1]">
              일치하는 링크가 없어요.
            </div>
          ) : (
            filteredLinks.map((item) => {
              const badge = getCategoryBadge(item.category);
              return (
                <div
                  key={item.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 hover:bg-[#f9fafb] dark:hover:bg-[#18181e] rounded-[16px] transition-colors gap-3"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-[14px] bg-[#e8f3ff] dark:bg-[#1c2638] flex items-center justify-center shrink-0 mt-0.5">
                      {getCategoryIcon(item.category)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[15px] sm:text-[16px] text-[#191f28] dark:text-white hover:text-[#3182f6] transition-colors truncate"
                        >
                          {item.title}
                        </a>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                        {item.isStarred && (
                          <Star className="w-3.5 h-3.5 fill-[#ffc342] text-[#ffc342]" />
                        )}
                      </div>

                      <p className="mt-0.5 text-[13px] text-[#6b7684] dark:text-[#9e9ea4] line-clamp-1">
                        {item.desc}
                      </p>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-[12px] text-[#8b95a1] dark:text-[#7e7e87] hover:underline truncate block"
                      >
                        {item.url}
                      </a>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex items-center justify-between sm:justify-end gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f2f4f6] dark:border-[#202027]">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => toggleStar(item.id, e)}
                        type="button"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#8b95a1] hover:text-[#ffc342] hover:bg-[#f2f4f6] dark:hover:bg-[#202027] transition-colors"
                        title="즐겨찾기"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            item.isStarred ? "fill-[#ffc342] text-[#ffc342]" : ""
                          }`}
                        />
                      </button>

                      <button
                        onClick={(e) => handleCopy(item.id, item.url, e)}
                        type="button"
                        className="h-8 px-2.5 rounded-full bg-[#f2f4f6] dark:bg-[#202027] text-[#4e5968] dark:text-[#c3c3c6] hover:text-[#191f28] dark:hover:text-white flex items-center gap-1 text-[12px] font-medium transition-colors"
                        title="복사"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#04b069]" />
                            <span className="text-[#04b069]">복사됨</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>복사</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => deleteLink(item.id, e)}
                        type="button"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#8b95a1] hover:text-[#f04452] hover:bg-[#f2f4f6] dark:hover:bg-[#202027] transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 px-3 rounded-full bg-[#f2f4f6] dark:bg-[#202027] text-[#3182f6] dark:text-[#3485fa] font-semibold text-[12px] flex items-center gap-1 hover:bg-[#e8f3ff] transition-colors"
                    >
                      <span>열기</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}
