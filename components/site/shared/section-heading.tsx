import { cn } from "@/lib/utils"
import type { SectionHeadingProps } from "@/types/site/shared"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const alignmentClassName = align === "left" ? "text-left" : "text-center"

  return (
    <div className={cn(alignmentClassName, className)}>
      {eyebrow ? (
        <span
          className={cn(
            "text-sm font-semibold tracking-wide text-primary uppercase",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={cn(
          "mt-2 text-4xl font-bold text-white",
          titleClassName
        )}
      >
        {title}
      </h2>

      {description ? (
        <p className={cn("mt-4 text-lg text-brand-muted", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
