import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { translations } from "@/src/lib/i18n";
import { Language } from "@/src/contexts/LanguageContext";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  t: (translations: Record<Language, string>) => string;
}

export function SearchBar({ value, onChange, t }: SearchBarProps) {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8f96a3] w-5 h-5" />
      <Input
        type="text"
        placeholder={t(translations.searchPokemon)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-4 py-6 rounded-full bg-[#171c26] shadow-card border-2 border-[#29303d] focus-visible:ring-offset-0 text-gray-300"
      />
    </div>
  );
}
