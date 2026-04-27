"use client";

import { LANGUAGES, isLanguageCode } from "@/lib/language";
import { useLanguage } from "@/components/language-provider";

export function LanguageSelect() {
  const { languageCode, setLanguageCode } = useLanguage();

  return (
    <label className="language-select-label" htmlFor="global-language">
      <span className="sr-only">Language</span>
      <select
        id="global-language"
        value={languageCode}
        onChange={(event) => {
          if (isLanguageCode(event.target.value)) setLanguageCode(event.target.value);
        }}
      >
        {LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </label>
  );
}
