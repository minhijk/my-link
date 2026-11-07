"use client";

import React from "react";
import { LinkItem } from "@/types";
import { LinkCard } from "@/components/LinkCard";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkListProps {
  links: LinkItem[];
  title?: string;
  showHeader?: boolean;
  emptyMessage?: string;
  emptyDescription?: string;
  className?: string;
}

/**
 * shadcn/ui Card 컴포넌트 기반 재사용 가능한 링크 목록 컨테이너
 * 순수 Tailwind CSS로 스타일링됨
 */
export function LinkList({
  links,
  title = "링크 목록",
  showHeader = false,
  emptyMessage = "등록된 활성 링크가 없습니다.",
  emptyDescription,
  className,
}: LinkListProps) {
  return (
    <div className={cn("space-y-3", className)} aria-label={title}>
      {showHeader && (
        <div className="flex items-center justify-between px-1 text-[13px] font-semibold text-[#8b95a1] dark:text-[#7e7e87]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#3182f6]" />
            {title} ({links.length})
          </span>
          <span>정렬순</span>
        </div>
      )}

      {/* 1열 세로 링크 카드 목록 */}
      <div className="flex flex-col gap-2.5">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>

      {/* 빈 목록 상태 (shadcn Card 기반) */}
      {links.length === 0 && (
        <Card className="rounded-[16px] p-8 text-center border border-[#e5e8eb] dark:border-[#2c2c35] bg-white dark:bg-[#14171d] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <Sparkles className="w-8 h-8 text-[#8b95a1] mx-auto mb-2 opacity-50" />
          <p className="text-[14px] font-medium text-[#191f28] dark:text-white">
            {emptyMessage}
          </p>
          {emptyDescription && (
            <p className="text-[13px] text-[#8b95a1] mt-1 break-keep">
              {emptyDescription}
            </p>
          )}
        </Card>
      )}
    </div>
  );
}
