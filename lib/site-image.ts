const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&h=900&fit=crop"

const OPTIMIZED_REMOTE_IMAGE_PREFIXES = [
  "https://images.unsplash.com/",
  "https://plus.unsplash.com/",
  "https://d138jhvnngk7dx.cloudfront.net/",
]

const PUBLIC_S3_ASSET_PREFIXES = [
  "home/banner/",
  "site-settings/logo/",
  "site-settings/favicon/",
]

const AWS_SIGNED_QUERY_PARAM_PATTERN = /[?&]x-amz-/i
const S3_IMAGE_CLOUDFRONT_BASE_URL = "https://d138jhvnngk7dx.cloudfront.net"
const S3_BUCKET_HOST = "auto-parts-pro.s3.eu-north-1.amazonaws.com"

const encodeS3Path = (path: string) =>
  path
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/")

const cloudFrontImageSrc = (key: string) =>
  `${S3_IMAGE_CLOUDFRONT_BASE_URL}/${encodeS3Path(key)}`

const publicAssetImageSrc = (key: string) =>
  `/api/site-image?key=${encodeURIComponent(key)}`

const convertS3ImageUrlToCloudFront = (src: string) => {
  try {
    const url = new URL(src)
    return url.host === S3_BUCKET_HOST ? cloudFrontImageSrc(decodeURIComponent(url.pathname).replace(/^\/+/, "")) : src
  } catch {
    return src
  }
}

const isAwsSignedImage = (src: string) => {
  if (!src.startsWith(`https://${S3_BUCKET_HOST}/`)) {
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
    return convertS3ImageUrlToCloudFront(imageSrc)
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
    return publicAssetImageSrc(normalizedKey)
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
