"use client";

import React, { useState } from "react";
import { UserSocials } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { GithubIcon, InstagramIcon, TwitterIcon } from "@/components/Icons";
import { Mail, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  socials?: UserSocials;
  shareTitle?: string;
  shareText?: string;
  hideShareButton?: boolean;
  className?: string;
}

/**
 * shadcn/ui Button 기반 재사용 가능한 소셜 링크 바 컴포넌트
 * - flex-wrap 적용으로 모바일 스몰 버전에서도 잘림 없이 자연스럽게 배치
 */
export function SocialLinks({
  socials,
  shareTitle = "MyLink 프로필",
  shareText = "마이링크 프로필을 확인해보세요.",
  hideShareButton = false,
  className,
}: SocialLinksProps) {
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator
          .share({
            title: shareTitle,
            text: shareText,
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

  if (!socials) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 max-w-full",
        className
      )}
    >
      {/* 클립보드 복사 알림 토스트 */}
      {copiedShare && (
        <div className="fixed top-20 z-50 flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[#191f28] text-white shadow-[0_8px_24px_rgba(25,31,40,0.16)] text-[14px] font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#04b069] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
          <span>프로필 주소가 클립보드에 복사되었어요.</span>
        </div>
      )}

      {socials.github && (
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 프로필"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-10 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-all shadow-xs"
          )}
        >
          <GithubIcon className="w-4 h-4 fill-current" />
        </a>
      )}

      {socials.instagram && (
        <a
          href={socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram 프로필"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-10 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-all shadow-xs"
          )}
        >
          <InstagramIcon className="w-4 h-4" />
        </a>
      )}

      {socials.twitter && (
        <a
          href={socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter 프로필"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-10 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-all shadow-xs"
          )}
        >
          <TwitterIcon className="w-4 h-4" />
        </a>
      )}

      {socials.email && (
        <a
          href={socials.email}
          aria-label="이메일 보내기"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-10 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-all shadow-xs"
          )}
        >
          <Mail className="w-4 h-4" />
        </a>
      )}

      {/* 프로필 공유 버튼 (옵션) */}
      {!hideShareButton && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          title="프로필 공유하기"
          className="size-10 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:bg-accent active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
