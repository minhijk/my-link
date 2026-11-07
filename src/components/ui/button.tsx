import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * TDS (토스 디자인 시스템, design.md) 규격이 주입된 shadcn/ui Button 컴포넌트
 * - XL(56px/r16), L(48px/r14), M(40px/r12), S(32px/r10) 규격 및 active scale 피드백 반영
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30 [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:opacity-90 active:opacity-100 shadow-xs",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[#e5e8eb] dark:hover:bg-[#2c2c35]",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3.5 text-sm rounded-[12px] gap-1.5 [&_svg:not([class*='size-'])]:size-4",
        xl: "h-14 px-6 text-[17px] font-bold rounded-[16px] gap-2 [&_svg:not([class*='size-'])]:size-5",
        lg: "h-12 px-5 text-[17px] font-bold rounded-[14px] gap-2 [&_svg:not([class*='size-'])]:size-5",
        md: "h-10 px-4 text-[15px] font-semibold rounded-[12px] gap-1.5 [&_svg:not([class*='size-'])]:size-4",
        sm: "h-8 px-3 text-[13px] font-semibold rounded-[10px] gap-1 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-7 px-2.5 text-xs font-medium rounded-full gap-1 [&_svg:not([class*='size-'])]:size-3",
        icon: "size-10 rounded-full [&_svg:not([class*='size-'])]:size-4",
        "icon-sm": "size-8 rounded-full [&_svg:not([class*='size-'])]:size-3.5",
        "icon-xs": "size-6 rounded-full [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
