import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const calSans = localFont({
  src: "./fonts/CalSansVF.woff2",
  variable: "--font-cal-sans",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "where2go",
  description: "Live seat counts for nearby cafes, reported by the cafes themselves.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${calSans.variable}`}>
      <body>
        {children}
        <footer className="footer">
          <div className="footer-inner">
            <span className="wordmark">where2go</span>
            <p>Demo data. The cafes listed here are fictional and their seat counts are for testing.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
