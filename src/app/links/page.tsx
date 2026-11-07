"use client";

import { useState } from "react";
import Link from "next/link";
import { useMounted } from "@/hooks/useMounted";
import { useLinkStore } from "@/hooks/useLinkStore";
import defaultData from "@/data/links.json";
import { LinkList } from "@/components/LinkList";
import { CategoryFilter, CategoryOption } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, RotateCcw } from "lucide-react";
import { LinkItem } from "@/types";

export default function LinksPage() {
  const mounted = useMounted();
  const { links, resetToDefault } = useLinkStore();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const allLinks: LinkItem[] = mounted ? links : (defaultData.links as LinkItem[]);

  // 카테고리 옵션 구성
  const categories: CategoryOption[] = [
    { id: "all", label: "전체" },
    ...Array.from(
      new Set(allLinks.map((l) => l.category).filter(Boolean) as string[])
    ).map((cat) => ({
      id: cat,
      label:
        cat === "portfolio"
          ? "포트폴리오"
          : cat === "blog"
          ? "블로그"
          : cat === "career"
          ? "이력서"
          : cat === "project"
          ? "프로젝트"
          : cat === "networking"
          ? "네트워킹"
          : cat === "design"
          ? "디자인"
          : cat,
    })),
  ];

  // 필터링된 링크 목록
  const filteredLinks = allLinks
    .filter((item) => item.isActive)
    .filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(search.toLowerCase())) ||
        item.url.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background px-4 py-6 sm:py-10 flex flex-col items-center">
      <div className="w-full max-w-md space-y-4 sm:space-y-5">
        {/* 상단 뒤로가기 & 복원 액션 (모바일 스몰 반응형) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈 프로필로</span>
          </Link>

          <Button
            variant="ghost"
            size="xs"
            onClick={resetToDefault}
            className="text-[12px] text-muted-foreground hover:text-primary rounded-full flex items-center gap-1 cursor-pointer"
            title="기본 더미 데이터로 리셋"
          >
            <RotateCcw className="w-3 h-3" />
            <span>기본값 복원</span>
          </Button>
        </div>

        {/* 상단 섹션 카드 (shadcn Card 기반, TDS radius-3xl: 24px) */}
        <Card className="rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 bg-card/90 backdrop-blur-sm border-border shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex-1 min-w-[180px]">
              <h1 className="text-[19px] sm:text-[22px] font-bold text-foreground tracking-tight">
                링크 모음
              </h1>
              <p className="mt-0.5 text-[13px] sm:text-[14px] text-muted-foreground">
                더미 데이터에서 불러온 추천 링크 목록이에요.
              </p>
            </div>
            <Badge variant="brand" className="shrink-0">
              총 {filteredLinks.length}개
            </Badge>
          </div>

          {/* 검색 입력창 (TDS text-field 규격: 44px, 12px radius, hairline border) */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="링크 제목 또는 설명 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-[12px] text-[14px] bg-secondary/80 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-card transition-all"
            />
          </div>

          {/* 재사용 가능한 카테고리 필터 칩 컴포넌트 */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Card>

        {/* 재사용 가능한 링크 목록 컴포넌트 */}
        <section>
          <LinkList
            links={filteredLinks}
            title="필터링된 링크 목록"
            emptyMessage="검색 결과가 없습니다"
            emptyDescription="다른 검색어를 입력하거나 필터를 초기화해보세요."
          />
        </section>
      </div>
    </div>
  );
}
