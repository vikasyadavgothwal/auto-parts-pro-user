export type SiteLanguage = "en" | "ar";

export const siteLanguageCookie = "app_lang";
export const siteLanguageStorageKey = "app_lang_pref";

export const siteLanguages: Array<{ value: SiteLanguage; label: string; shortLabel: string }> = [
  { value: "en", label: "English", shortLabel: "EN" },
  { value: "ar", label: "Arabic", shortLabel: "AR" },
];

export const isSiteLanguage = (value: unknown): value is SiteLanguage =>
  value === "en" || value === "ar";

export const siteLanguageDirection = (language: SiteLanguage) =>
  language === "ar" ? "rtl" : "ltr";
