"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "cn"

/**
 * TDS (토스 디자인 시스템, design.md) 규격이 주입된 shadcn/ui Avatar 컴포넌트
 * - 원형 곡률(radius-full), 헤어라인 테두리 및 서브 섀도우 지원
 */
function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg" | "xl"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-10 shrink-0 rounded-full select-none overflow-hidden bg-[#e8f3ff] dark:bg-[#1c2638] border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)] data-[size=xl]:size-20 data-[size=lg]:size-12 data-[size=sm]:size-8",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-[#e8f3ff] dark:bg-[#1c2638] text-[#3182f6] dark:text-[#3485fa] font-bold text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
