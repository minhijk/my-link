import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * TDS (토스 디자인 시스템, design.md) 규격이 주입된 shadcn/ui Badge 컴포넌트
 * - 22px 높이, 6px/full 라운드, washed brand 배경 매핑
 */
const badgeVariants = cva(
  "group/badge inline-flex h-[22px] w-fit shrink-0 items-center justify-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        brand:
          "bg-[#e8f3ff] text-[#3182f6] dark:bg-[#1c2638] dark:text-[#3485fa] border-0",
        secondary:
          "bg-secondary text-secondary-foreground dark:bg-[#202027] dark:text-[#c3c3c6]",
        outline:
          "border border-border text-foreground bg-transparent",
        ghost:
          "hover:bg-muted text-muted-foreground",
        destructive:
          "bg-[#f04452]/10 text-[#f04452] dark:bg-[#f04452]/20 dark:text-[#f04251]",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  }
)

function Badge({
  className,
  variant = "brand",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
