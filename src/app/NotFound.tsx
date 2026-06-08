import { useLocation } from "react-router-dom";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/i18n";

const NotFound = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#252b37]">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t(translations.notFoundTitle)}</h1>
        <p className="mb-4 text-xl text-[#8f96a3]">
          {t(translations.notFoundDescription)}
        </p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          {t(translations.returnToHome)}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
