import { LANGUAGES, useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ compact = false, className }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className={cn("flex items-center gap-1 rounded-xl bg-slate-100 p-1", className)}
    >
      {LANGUAGES.map((option) => {
        const active = option.id === lang;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setLang(option.id)}
            aria-pressed={active}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
              active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {compact ? option.short : option.label}
          </button>
        );
      })}
    </div>
  );
}
