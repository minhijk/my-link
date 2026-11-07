"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CategoryOption {
  id: string;
  label: string;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  className?: string;
}

/**
 * 토스 디자인 시스템(TDS) 스타일의 재사용 가능한 카테고리 칩 필터 컴포넌트
 * 순수 Tailwind CSS로 스타일링됨
 */
export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: CategoryFilterProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none",
        className
      )}
      role="tablist"
      aria-label="카테고리 필터"
    >
      {categories.map((c) => {
        const active = selectedCategory === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onSelectCategory(c.id)}
            type="button"
            role="tab"
            aria-selected={active}
            className={cn(
              "h-8 px-3.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#3182f6]",
              active
                ? "bg-[#191f28] dark:bg-white text-white dark:text-[#191f28] shadow-xs"
                : "bg-[#f2f4f6] dark:bg-[#202027] text-[#6b7684] dark:text-[#9e9ea4] hover:bg-[#e5e8eb] dark:hover:bg-[#2c2c35]"
            )}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
