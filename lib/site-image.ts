const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&h=900&fit=crop"

const OPTIMIZED_REMOTE_IMAGE_PREFIXES = [
  "https://images.unsplash.com/",
  "https://plus.unsplash.com/",
  "https://auto-parts-pro.s3.eu-north-1.amazonaws.com/",
]

const PUBLIC_S3_ASSET_PREFIXES = [
  "home/banner/",
  "site-settings/logo/",
  "site-settings/favicon/",
]

const AWS_SIGNED_QUERY_PARAM_PATTERN = /[?&]x-amz-/i

const isAwsSignedImage = (src: string) => {
  if (!src.startsWith("https://auto-parts-pro.s3.eu-north-1.amazonaws.com/")) {
    return false
  }

  return AWS_SIGNED_QUERY_PARAM_PATTERN.test(src)
}

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
  (OPTIMIZED_REMOTE_IMAGE_PREFIXES.some((prefix) => src.startsWith(prefix)) &&
    !isAwsSignedImage(src))

export const isPublicS3AssetKey = (key: string) =>
  Boolean(key) &&
  !key.includes("..") &&
  PUBLIC_S3_ASSET_PREFIXES.some((prefix) => key.startsWith(prefix))

export const resolvePublicS3AssetSrc = (
  key: string | null | undefined,
  fallback: string | null | undefined,
  fallbackImage = DEFAULT_PRODUCT_IMAGE,
) => {
  const normalizedKey = key?.trim() ?? ""
  const normalizedFallback = fallback?.trim() ?? ""

  if (isPublicS3AssetKey(normalizedKey)) {
    return `/api/site-image?key=${encodeURIComponent(normalizedKey)}`
  }

  if (!normalizedFallback && !fallbackImage.trim()) {
    return ""
  }

  return resolveSiteImageSrc(normalizedFallback, fallbackImage)
}

export const getImageOptimizationSizes = (candidate: "logo" | "card" | "hero") => {
  if (candidate === "logo") {
    return "(max-width: 768px) 140px, (max-width: 1280px) 172px, 200px"
  }

  if (candidate === "hero") {
    return "100vw"
  }

  return "(max-width: 768px) 100vw, 50vw"
}

export const resolveImageCandidate = (value: string | null | undefined, fallback: string) => {
  const resolved = resolveSiteImageSrc(value, fallback)
  const isFallback = resolved === fallback
  return { resolved, isFallback }
}
