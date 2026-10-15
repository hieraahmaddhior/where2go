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
  description: "Jumlah kursi kosong di kafe terdekat, dilaporkan langsung oleh kafenya.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${calSans.variable}`}>
      <body>
        {children}
        <footer className="footer">
          <div className="footer-inner">
            <span className="wordmark">where2go</span>
            <p>
              Demo. Nama dan alamat kafe asli, tetapi status meja disimulasikan dan fasilitas, aturan, harga, serta
              sebagian jam buka adalah contoh, bukan data dari kafe.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
