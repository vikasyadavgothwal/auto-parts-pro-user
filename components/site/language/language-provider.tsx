"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  isSiteLanguage,
  siteLanguageCookie,
  siteLanguageDirection,
  siteLanguageStorageKey,
  type SiteLanguage,
} from "@/lib/language-preference";
import { arabicPartTermTranslations, arabicTranslations } from "@/lib/site-arabic-translations";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageSecret = "autoparts-pro-main-site-language";

const encodePreference = (value: SiteLanguage) => {
  const encoded = Array.from(value)
    .map((char, index) =>
      String.fromCharCode(char.charCodeAt(0) ^ storageSecret.charCodeAt(index % storageSecret.length)),
    )
    .join("");
  return window.btoa(encoded);
};

const decodePreference = (value: string | null): SiteLanguage | null => {
  if (!value) return null;
  try {
    const decoded = window
      .atob(value)
      .split("")
      .map((char, index) =>
        String.fromCharCode(char.charCodeAt(0) ^ storageSecret.charCodeAt(index % storageSecret.length)),
      )
      .join("");
    return isSiteLanguage(decoded) ? decoded : null;
  } catch {
    return null;
  }
};

const setCookie = (name: string, value: string, maxAge = 60 * 60 * 24 * 365) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
};

const clearGoogleTranslateCookie = () => {
  setCookie("googtrans", "", 0);
  if (window.location.hostname.includes(".")) {
    const domain = `.${window.location.hostname.split(".").slice(-2).join(".")}`;
    document.cookie = `googtrans=; path=/; domain=${domain}; max-age=0; samesite=lax`;
  }
};

const readInitialLanguage = (fallback: SiteLanguage): SiteLanguage => {
  const stored = decodePreference(window.localStorage.getItem(siteLanguageStorageKey));
  if (stored) return stored;
  return fallback;
};

const translatedTextNodes = new WeakMap<Text, string>();
const translatedAttributes = new WeakMap<Element, Record<string, string>>();
const translatableAttributes = ["placeholder", "aria-label", "title"] as const;
const ignoredParents = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT"]);

const normalizedText = (value: string) => value.replace(/\s+/g, " ").trim();
const shouldSkipElement = (element: Element | null) => Boolean(element?.closest("[data-no-translate='true']"));

const translatedPartTerms = (value: string) => {
  let translated = value;
  let changed = false;
  for (const [pattern, replacement] of arabicPartTermTranslations) {
    translated = translated.replace(pattern, () => {
      changed = true;
      return replacement;
    });
  }
  return changed ? translated : null;
};

const translatedLocationTerms = (value: string) => {
  const locationTerms: Array<[RegExp, string]> = [
    [/\bAbu Dhabi\b/gi, "أبوظبي"],
    [/\bDubai\b/gi, "دبي"],
    [/\bSharjah\b/gi, "الشارقة"],
    [/\bAjman\b/gi, "عجمان"],
    [/\bUnited Arab Emirates\b/gi, "الإمارات العربية المتحدة"],
    [/\bUAE\b/g, "الإمارات"],
  ];
  let translated = value;
  let changed = false;
  for (const [pattern, replacement] of locationTerms) {
    translated = translated.replace(pattern, () => {
      changed = true;
      return replacement;
    });
  }
  return changed ? translated : value;
};

const translatedValue = (value: string) => {
  const normalized = normalizedText(value);
  if (arabicTranslations[normalized]) return arabicTranslations[normalized];

  const duplicateBrandMatch = normalized.match(/^Join thousands of repair shops and fleet managers who trust AutoPartsPro(?:\s+AutoPartsPro)+$/i);
  if (duplicateBrandMatch) {
    return "انضم إلى آلاف ورش الإصلاح ومديري الأساطيل الذين يثقون بأوتو بارتس برو";
  }

  const numberedTextMatch = normalized.match(/^(.+?)(\d+)$/);
  if (numberedTextMatch) {
    const prefix = normalizedText(numberedTextMatch[1]);
    if (arabicTranslations[prefix]) return `${arabicTranslations[prefix]} ${numberedTextMatch[2]}`;
  }

  const partsMatch = normalized.match(/^([\d,]+)\s+parts$/i);
  if (partsMatch) return `${partsMatch[1]} قطعة`;

  const supplierMatch = normalized.match(/^([\d,]+)\s+verified suppliers?$/i);
  if (supplierMatch) return `${supplierMatch[1]} مورد معتمد`;

  const itemMatch = normalized.match(/^([\d,]+)\s+items?$/i);
  if (itemMatch) return `${itemMatch[1]} عنصر`;

  const addedSuccessfullyMatch = normalized.match(/^(.+)\s+was added successfully\.$/i);
  if (addedSuccessfullyMatch) {
    const item = translatedPartTerms(addedSuccessfullyMatch[1]) ?? addedSuccessfullyMatch[1];
    return `تمت إضافة ${item} بنجاح.`;
  }

  const checkoutCreatedMatch = normalized.match(/^([\d,]+)\s+orders?(?:\s+and\s+([\d,]+)\s+service bookings?)?\s+created successfully\.$/i);
  if (checkoutCreatedMatch) {
    const orderText = `${checkoutCreatedMatch[1]} ${checkoutCreatedMatch[1] === "1" ? "طلب" : "طلبات"}`;
    const serviceText = checkoutCreatedMatch[2]
      ? ` و${checkoutCreatedMatch[2]} ${checkoutCreatedMatch[2] === "1" ? "حجز خدمة" : "حجوزات خدمات"}`
      : "";
    return `تم إنشاء ${orderText}${serviceText} بنجاح.`;
  }

  const stockMatch = normalized.match(/^([\d,]+)\s+in stock$/i);
  if (stockMatch) return `${stockMatch[1]} متوفر في المخزون`;

  const resultsMatch = normalized.match(/^Showing\s+([\d,]+)\s+results?\s+for\s+(.+)$/i);
  if (resultsMatch) return `عرض ${resultsMatch[1]} نتيجة لـ ${translatedPartTerms(resultsMatch[2]) ?? resultsMatch[2]}`;

  const garageResultsMatch = normalized.match(/^Showing\s+([\d,]+)\s+of\s+([\d,]+)\s+garages$/i);
  if (garageResultsMatch) return `عرض ${garageResultsMatch[1]} من ${garageResultsMatch[2]} ورشة`;

  const chooseSuppliersMatch = normalized.match(/^Choose from\s+([\d,]+)\s+verified suppliers\s+[—-]\s+featured supplier highlighted$/i);
  if (chooseSuppliersMatch) return `اختر من ${chooseSuppliersMatch[1]} مورد معتمد - مع تمييز المورد المميز`;

  const supplierHighlightMatch = normalized.match(/^verified suppliers\s+[—-]\s+featured supplier highlighted$/i);
  if (supplierHighlightMatch) return "موردين معتمدين - مع تمييز المورد المميز";

  const reviewsMatch = normalized.match(/^\(([\d,]+)\s+reviews?\)$/i);
  if (reviewsMatch) return `(${reviewsMatch[1]} تقييم)`;

  const daysMatch = normalized.match(/^([\d,]+)\s+days?$/i);
  if (daysMatch) return `${daysMatch[1]} يوم`;

  const minutesMatch = normalized.match(/^([\d,]+)\s+min$/i);
  if (minutesMatch) return `${minutesMatch[1]} دقيقة`;

  const durationMatch = normalized.match(/^([\d,]+)h(?:\s+([\d,]+)m)?$/i);
  if (durationMatch) return durationMatch[2] ? `${durationMatch[1]} ساعة ${durationMatch[2]} دقيقة` : `${durationMatch[1]} ساعة`;

  const yearsMatch = normalized.match(/^([\d,]+)\s+yrs?$/i);
  if (yearsMatch) return `${yearsMatch[1]} سنوات`;

  const conditionMatch = normalized.match(/^(.+?)\s+-\s+(.+)$/);
  if (conditionMatch) {
    const left = arabicTranslations[conditionMatch[1]] ?? translatedPartTerms(conditionMatch[1]) ?? conditionMatch[1];
    const right = arabicTranslations[conditionMatch[2]] ?? translatedPartTerms(conditionMatch[2]) ?? conditionMatch[2];
    if (left !== conditionMatch[1] || right !== conditionMatch[2]) return `${left} - ${right}`;
  }

  const cartValueMatch = normalized.match(/^Cart value\s+(.+)$/i);
  if (cartValueMatch) return `قيمة السلة ${cartValueMatch[1]}`;

  const deliveringToMatch = normalized.match(/^Delivering to\s+(.+)$/i);
  if (deliveringToMatch) return `التسليم إلى ${translatedLocationTerms(deliveringToMatch[1])}`;

  const contactNumberMatch = normalized.match(/^Contact Number:\s*(.+)$/i);
  if (contactNumberMatch) return `رقم التواصل: ${contactNumberMatch[1]}`;

  const addressMatch = normalized.match(/^Address:\s*(.+)$/i);
  if (addressMatch) return `العنوان: ${translatedLocationTerms(addressMatch[1])}`;

  const skuMatch = normalized.match(/^SKU:\s*(.+)$/i);
  if (skuMatch) return `رمز المنتج: ${skuMatch[1]}`;

  const mileageMatch = normalized.match(/^Mileage:\s*(.+)$/i);
  if (mileageMatch) return `المسافة المقطوعة: ${mileageMatch[1]}`;

  const statusMatch = normalized.match(/^Status:\s*(.+)$/i);
  if (statusMatch) {
    const status = arabicTranslations[statusMatch[1]] ?? statusMatch[1];
    return `الحالة: ${status}`;
  }

  const partNumberMatch = normalized.match(/^Part #:\s*(.+)$/i);
  if (partNumberMatch) return `رقم القطعة: ${partNumberMatch[1]}`;

  const partHeadingMatch = normalized.match(/^Part #([\d,]+)$/i);
  if (partHeadingMatch) return `القطعة رقم ${partHeadingMatch[1]}`;

  const startingAtMatch = normalized.match(/^Starting at\s+(.+)$/i);
  if (startingAtMatch) return `يبدأ من ${startingAtMatch[1]}`;

  const advancePaymentMatch = normalized.match(/^Advance payment\s+\((.+)\)$/i);
  if (advancePaymentMatch) return `دفعة مقدمة (${advancePaymentMatch[1]})`;

  const dateAtTimeMatch = normalized.match(/^(.+)\s+at\s+(.+)$/i);
  if (dateAtTimeMatch) {
    const dateLabel = arabicTranslations[dateAtTimeMatch[1]] ?? dateAtTimeMatch[1];
    return `${dateLabel} في ${dateAtTimeMatch[2]}`;
  }

  const paymentStatusMatch = normalized.match(/^Payment status:\s*(.+)\.?$/i);
  if (paymentStatusMatch) return `حالة الدفع: ${paymentStatusMatch[1]}.`;

  const advancePaymentSuccessMatch = normalized.match(/^Advance payment of\s+(.+)\s+was successful\.$/i);
  if (advancePaymentSuccessMatch) return `تم دفع مقدم بقيمة ${advancePaymentSuccessMatch[1]} بنجاح.`;

  const pageMatch = normalized.match(/^Page\s+([\d,]+)\s+of\s+([\d,]+)$/i);
  if (pageMatch) return `صفحة ${pageMatch[1]} من ${pageMatch[2]}`;

  const pagedGarageMatch = normalized.match(/^Showing\s+([\d,]+)-([\d,]+)\s+of\s+([\d,]+)\s+garages$/i);
  if (pagedGarageMatch) return `عرض ${pagedGarageMatch[1]}-${pagedGarageMatch[2]} من ${pagedGarageMatch[3]} ورشة`;

  const trendMatch = normalized.match(/^(.+)\s+vs last month$/i);
  if (trendMatch) return `${trendMatch[1]} مقارنة بالشهر الماضي`;

  const partTermTranslation = translatedPartTerms(normalized);
  if (partTermTranslation) return partTermTranslation;

  const locationTermTranslation = translatedLocationTerms(normalized);
  if (locationTermTranslation !== normalized) return locationTermTranslation;

  return null;
};

const walkTextNodes = (root: ParentNode, visitor: (node: Text) => void) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ignoredParents.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (shouldSkipElement(parent)) return NodeFilter.FILTER_REJECT;
      return normalizedText(node.nodeValue ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  let node = walker.nextNode();
  while (node) {
    visitor(node as Text);
    node = walker.nextNode();
  }
};

const translateTextNode = (node: Text) => {
  const original = translatedTextNodes.get(node) ?? node.nodeValue ?? "";
  const translated = translatedValue(original);
  if (!translated) return;
  const nextValue = original.replace(normalizedText(original), translated);
  translatedTextNodes.set(node, original);
  if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
};

const applyArabicTranslations = (root: ParentNode = document.body) => {
  walkTextNodes(root, translateTextNode);

  const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll("*"))] : Array.from(root.querySelectorAll("*"));
  for (const element of elements) {
    if (shouldSkipElement(element)) continue;
    for (const attribute of translatableAttributes) {
      const current = element.getAttribute(attribute);
      if (!current) continue;
      const original = translatedAttributes.get(element)?.[attribute] ?? current;
      const translated = translatedValue(original);
      if (!translated) continue;
      translatedAttributes.set(element, {
        ...(translatedAttributes.get(element) ?? {}),
        [attribute]: original,
      });
      element.setAttribute(attribute, translated);
    }
  }
};

const restoreEnglish = (root: ParentNode = document.body) => {
  walkTextNodes(root, (node) => {
    const original = translatedTextNodes.get(node);
    if (original) node.nodeValue = original;
  });

  const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll("*"))] : Array.from(root.querySelectorAll("*"));
  for (const element of elements) {
    const originals = translatedAttributes.get(element);
    if (!originals) continue;
    for (const [attribute, value] of Object.entries(originals)) {
      element.setAttribute(attribute, value);
    }
  }
};

export function LanguageProvider({
  children,
  initialLanguage = "en",
}: {
  children: ReactNode;
  initialLanguage?: SiteLanguage;
}) {
  const [language, setLanguageState] = useState<SiteLanguage>(() =>
    typeof window === "undefined" ? initialLanguage : readInitialLanguage(initialLanguage),
  );

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = siteLanguageDirection(language);
    window.localStorage.setItem(siteLanguageStorageKey, encodePreference(language));
    setCookie(siteLanguageCookie, language);
    clearGoogleTranslateCookie();
    if (language === "ar") {
      applyArabicTranslations();
    } else {
      restoreEnglish();
    }
  }, [language]);

  useEffect(() => {
    if (language !== "ar") return;
    let observer: MutationObserver | null = null;
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target instanceof Text) {
          translateTextNode(mutation.target);
        }
        for (const node of Array.from(mutation.addedNodes)) {
          if (node instanceof Text) {
            translateTextNode(node);
          } else if (node instanceof Element) {
            applyArabicTranslations(node);
          }
        }
      }
    });
    observer.observe(document.body, { characterData: true, childList: true, subtree: true });
    return () => {
      observer?.disconnect();
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: SiteLanguage) => {
        setLanguageState(nextLanguage);
        setCookie(siteLanguageCookie, nextLanguage);
        clearGoogleTranslateCookie();
      },
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
