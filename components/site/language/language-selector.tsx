"use client";

import { Globe2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/site/language/language-provider";
import { siteLanguages, type SiteLanguage } from "@/lib/language-preference";

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();

  if (compact) {
    return (
      <Button
        type="button"
        variant="outline"
        data-no-translate="true"
        className="h-10 gap-2 rounded-xl border-border bg-transparent px-3 text-sm text-inherit hover:bg-muted"
        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
        aria-label="Change language"
        title="Change language"
      >
        <Globe2 className="size-4" />
        {language === "en" ? "AR" : "EN"}
      </Button>
    );
  }

  return (
    <div data-no-translate="true">
      <Select value={language} onValueChange={(value) => setLanguage(value as SiteLanguage)}>
      <SelectTrigger
        className="h-10 w-[8.5rem] rounded-xl border-border bg-transparent text-inherit"
        aria-label="Select language"
      >
        <Globe2 className="size-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent data-no-translate="true">
        {siteLanguages.map((item) => (
          <SelectItem key={item.value} value={item.value} data-no-translate="true">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
      </Select>
    </div>
  );
}
