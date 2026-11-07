"use client";

import React, { useState } from "react";
import { LinkItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicLinkIcon } from "@/components/LinkIcon";
import { ChevronRight, Copy, Check } from "lucide-react";

interface LinkCardProps {
  link: LinkItem;
}

/**
 * shadcn/ui Card 및 Badge 프리미티브에 TDS(design.md) 시각 규격을 주입한 링크 카드 컴포넌트
 * - 16px 시그니처 곡률(radius-xl)
 * - 1px 헤어라인 보더
 * - TDS cubic-bezier(0.22, 0.61, 0.36, 1) 인터랙션
 */
export function LinkCard({ link }: LinkCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full no-underline outline-none"
    >
      <Card className="relative overflow-hidden p-4 sm:p-4.5 hover:shadow-[0_8px_20px_rgba(49,130,246,0.08)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer">
        <div className="flex items-center gap-3.5">
          {/* 좌측 아이콘 박스 (TDS radius-l: 14px) */}
          <div className="w-11 h-11 rounded-[14px] bg-[#f2f4f6] dark:bg-[#202027] text-[#3182f6] dark:text-[#3485fa] flex items-center justify-center shrink-0 border border-border group-hover:bg-[#e8f3ff] dark:group-hover:bg-[#1c2638] transition-colors duration-150">
            <DynamicLinkIcon name={link.icon} className="w-5 h-5" />
          </div>

          {/* 중앙 텍스트 영역 (TDS Title-2 & Body-2) */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-[17px] text-foreground tracking-tight truncate group-hover:text-primary transition-colors">
                {link.title}
              </span>
              {link.badge && (
                <Badge variant="brand">
                  {link.badge}
                </Badge>
              )}
            </div>

            {link.description && (
              <p className="mt-1 text-[14px] text-muted-foreground line-clamp-1 break-keep leading-relaxed font-normal">
                {link.description}
              </p>
            )}
          </div>

          {/* 우측 액션: 복사 버튼 & 화살표 */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              title="링크 주소 복사"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer opacity-70 group-hover:opacity-100"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#04b069]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </Card>
    </a>
  );
}
