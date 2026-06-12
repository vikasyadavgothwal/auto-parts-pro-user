import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { features } from "@/lib/data/user"
import {
  getPublicText,
  type HomeBannerConfig,
} from "@/lib/public-content"

export function HeroSection({ config }: { config?: HomeBannerConfig }) {
  const backgroundImage = getPublicText(config?.backgroundImage) || "/home.jpg"
  const resolvedBackgroundImage = backgroundImage.startsWith("http")
    ? backgroundImage
    : backgroundImage.startsWith("/")
      ? backgroundImage
      : `/${backgroundImage}`
  const badgeText = getPublicText(config?.badgeText)
  const heading = getPublicText(config?.heading)
  const subheading = getPublicText(config?.subheading)
  const keyPoints = (config?.keyPoints ?? []).map(getPublicText).filter(Boolean)
  const canOptimizeImage =
    resolvedBackgroundImage.startsWith("/") ||
    resolvedBackgroundImage.startsWith("https://images.unsplash.com/") ||
    resolvedBackgroundImage.startsWith("https://plus.unsplash.com/")

  if (
    !backgroundImage &&
    !badgeText &&
    !heading &&
    !subheading &&
    keyPoints.length === 0
  ) {
    return null
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {canOptimizeImage ? (
          <div className="absolute inset-0 h-full w-full relative">
            <Image
              src={resolvedBackgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              fetchPriority="high"
            />
          </div>
        ) : (
          <img
            src={resolvedBackgroundImage}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/24" />
      </div>

      <div className="site-container relative py-24">
        <div className="mb-16 max-w-3xl text-left">
          {badgeText ? (
            <div>
              <Badge
                variant="outline"
                className="mb-6 rounded-full border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
              >
                {badgeText}
              </Badge>
            </div>
          ) : null}

          {heading ? (
            <h1
              className="mb-6 max-w-4xl text-[48px] font-bold leading-tight text-white"
            >
              {heading}
            </h1>
          ) : null}

          {subheading ? (
            <p
              className="text-[20px] leading-relaxed text-white"
            >
              {subheading}
            </p>
          ) : null}
        </div>

        {keyPoints.length ? (
          <div
            className="mt-6 flex flex-col justify-start gap-6"
          >
            {keyPoints.map((point, index) => {
              const Icon = features[index % features.length]?.icon
              return (
                <div key={point} className="flex items-center gap-3">
                  {Icon ? <Icon className="h-5 w-5 text-white" /> : null}
                  <span className="text-sm text-white">{point}</span>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
