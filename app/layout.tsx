import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { getSession } from "@/lib/auth";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "The Royal Heritage — Royal Coastal Resort on the Arabian Sea",
    template: "%s · The Royal Heritage",
  },
  description:
    "An ultra-luxury royal coastal resort on the Arabian Sea, inspired by the palaces of Rajasthan and the calm of the Mediterranean. Rooms, suites and private pool villas.",
  openGraph: {
    title: "The Royal Heritage",
    description: "A royal coastal resort on the Arabian Sea.",
    images: ["/img/hero.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2A1F18",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <ToastProvider>
          <Header user={session ? { name: session.name, role: session.role } : null} />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
