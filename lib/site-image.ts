const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&h=900&fit=crop"

const OPTIMIZED_REMOTE_IMAGE_PREFIXES = [
  "https://images.unsplash.com/",
  "https://plus.unsplash.com/",
  "https://auto-parts-pro.s3.eu-north-1.amazonaws.com/",
]

export const resolveSiteImageSrc = (
  value: string | null | undefined,
  fallback = DEFAULT_PRODUCT_IMAGE,
) => {
  const fallbackSrc = fallback.trim() || DEFAULT_PRODUCT_IMAGE
  const imageSrc = value?.trim()

  if (!imageSrc) {
    return fallbackSrc
  }

  if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://")) {
    return imageSrc
  }

  if (imageSrc.startsWith("//")) {
    return `https:${imageSrc}`
  }

  return imageSrc.startsWith("/") ? imageSrc : fallbackSrc
}

export const canOptimizeSiteImageSrc = (src: string) =>
  src.startsWith("/") ||
  OPTIMIZED_REMOTE_IMAGE_PREFIXES.some((prefix) => src.startsWith(prefix))
