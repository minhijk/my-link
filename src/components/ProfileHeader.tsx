"use client";

import React, { useState } from "react";
import { UserProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/SocialLinks";
import { Share2, Mail, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  profile: UserProfile;
  className?: string;
}

/**
 * shadcn/ui Avatar, Button 및 SocialLinks 기반 재사용 가능한 프로필 헤더 컴포넌트
 * - 모바일 스몰 버전 대응: 콜 투 액션(CTA) 버튼이 세로 스택(flex-col)으로 배치되어
 *   터치 타겟과 가독성을 확보하며, sm 이상에서 가로 1열(sm:flex-row)로 전환됩니다.
 */
export function ProfileHeader({ profile, className }: ProfileHeaderProps) {
  const [copiedShare, setCopiedShare] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "M";
    return name.slice(0, 1);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator
          .share({
            title: `${profile.displayName} | MyLink`,
            text: profile.bio,
            url: window.location.href,
          })
          .catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    }
  };

  return (
    <div className={cn("flex flex-col items-center text-center w-full", className)}>
      {/* 클립보드 복사 알림 토스트 (design.md Toast 규격) */}
      {copiedShare && (
        <div className="fixed top-20 z-50 flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[#191f28] text-white shadow-[0_8px_24px_rgba(25,31,40,0.16)] text-[14px] font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#04b069] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
          <span>프로필 주소가 클립보드에 복사되었어요.</span>
        </div>
      )}

      {/* 1. 프로필 아바타 (80x80px 원형, 흰색 2px 보더, TDS 서브 섀도우) */}
      <div className="relative group">
        <Avatar
          size="xl"
          className="border-2 border-white dark:border-[#2c2c35] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
        >
          {profile.avatarUrl && (
            <AvatarImage
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="object-cover"
            />
          )}
          <AvatarFallback className="text-2xl font-bold">
            {getInitials(profile.displayName)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* 2. 이름 & 핸들 (TDS Title-1 20px / 700) */}
      <div className="mt-4 flex flex-col items-center">
        <h1 className="text-[20px] font-bold text-foreground tracking-tight leading-tight">
          {profile.displayName}
        </h1>
        <span className="mt-1 text-[14px] font-medium text-muted-foreground">
          @{profile.username}
        </span>
      </div>

      {/* 3. 한 줄 소개글 (TDS Body-2 15px / 400 - 최대 2줄 중앙 정렬) */}
      {profile.bio && (
        <p className="mt-2.5 max-w-sm text-[15px] font-normal leading-relaxed text-muted-foreground break-keep line-clamp-2">
          {profile.bio}
        </p>
      )}

      {/* 4. 콜 투 액션 (CTA) 버튼 레이아웃
          - 모바일 스몰 버전: flex-col (세로 1열 스택, full width)로 전환하여 글자 짤림 방지 및 터치 타겟 확보
          - sm 이상: sm:flex-row (가로 1열 나열) */}
      <div className="mt-5 w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
        <Button
          variant="default"
          onClick={handleShare}
          className="w-full sm:flex-1 h-11 rounded-[12px] text-[14px] font-semibold gap-2 shadow-xs cursor-pointer active:scale-[0.98]"
        >
          <Share2 className="w-4 h-4" />
          <span>프로필 공유하기</span>
        </Button>

        {profile.socials?.email && (
          <a
            href={profile.socials.email}
            className="w-full sm:flex-1"
          >
            <Button
              variant="secondary"
              className="w-full h-11 rounded-[12px] text-[14px] font-semibold gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Mail className="w-4 h-4" />
              <span>이메일 문의하기</span>
            </Button>
          </a>
        )}
      </div>

      {/* 5. 재사용 가능한 소셜 채널 링크 바 (GitHub, Instagram, Twitter) */}
      <div className="mt-4 pt-3.5 border-t border-border/60 w-full flex justify-center">
        <SocialLinks
          socials={profile.socials}
          shareTitle={`${profile.displayName} | MyLink`}
          shareText={profile.bio}
          hideShareButton={true}
        />
      </div>
    </div>
  );
}
