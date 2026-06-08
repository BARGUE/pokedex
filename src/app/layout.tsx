import { ReactNode } from "react";
import { Providers } from "@/src/providers/Providers";
import "./globals.css";
import { BackToTop } from "../components/BackToTop";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Providers> {children} <BackToTop /></Providers>
      </body>
    </html>
  );
};

export default Layout;
