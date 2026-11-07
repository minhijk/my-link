"use client";

import { useMounted } from "@/hooks/useMounted";
import { useLinkStore } from "@/hooks/useLinkStore";
import defaultData from "@/data/links.json";
import { ProfileHeader } from "@/components/ProfileHeader";
import { LinkList } from "@/components/LinkList";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { LinkItem } from "@/types";

export default function Home() {
  const mounted = useMounted();
  const { profile, links, resetToDefault } = useLinkStore();

  // 하이드레이션 불일치 방지: 마운트 전에는 JSON 더미 데이터의 정적 값 사용
  const currentProfile = mounted ? profile : defaultData.profile;
  const currentLinks: LinkItem[] = (
    mounted ? links : (defaultData.links as LinkItem[])
  )
    .filter((link) => link.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background px-4 py-8 sm:py-12 flex flex-col items-center">
      <div className="w-full max-w-md space-y-6">
        {/* 1. 재사용 가능한 프로필 헤더 컴포넌트 (shadcn/ui Avatar + SocialLinks, TDS radius-3xl: 24px) */}
        <section className="bg-card/90 backdrop-blur-sm rounded-[24px] p-6 sm:p-7 border border-border shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <ProfileHeader profile={currentProfile} />
        </section>

        {/* 2. 재사용 가능한 링크 목록 컴포넌트 (shadcn/ui Card + Badge) */}
        <section>
          <LinkList
            links={currentLinks}
            title="주요 링크"
            showHeader
            emptyMessage="등록된 링크가 없습니다."
          />
        </section>

        {/* 3. 푸터 브랜딩 및 시연용 기본 데이터 복원 버튼 */}
        <div className="pt-2 flex flex-col items-center gap-3 text-center">
          <p className="text-[13px] text-muted-foreground">
            마이링크로 나만의 프로필을 만들어보세요
          </p>

          <Button
            variant="ghost"
            size="xs"
            onClick={resetToDefault}
            className="text-[12px] text-muted-foreground hover:text-primary rounded-full"
            title="기본 데모 데이터로 복원"
          >
            <RotateCcw className="w-3 h-3" />
            <span>기본 데이터 복원</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
