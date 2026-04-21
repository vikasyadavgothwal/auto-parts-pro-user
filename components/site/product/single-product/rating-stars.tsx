import { RatingStarIcon } from "@/components/icons/site-icons";
import { cn } from "@/lib/utils";
import type { RatingStarsProps } from "@/types/site/product";

const STAR_COUNT = 5;

export function RatingStars({
  rating,
  size = "h-5 w-5",
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: STAR_COUNT }).map((_, index) => {
        const filled = index < fullStars;

        return (
          <RatingStarIcon
            key={index}
            filled={filled}
            className={cn(
              size,
              filled
                ? "fill-[#F59E0B] text-[#F59E0B]"
                : "text-[#2A2A2A]"
            )}
          />
        );
      })}
    </div>
  );
}
