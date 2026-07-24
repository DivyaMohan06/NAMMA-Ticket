import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Namma Ticket — Bengaluru moves smarter",
  description: "Book your BMTC bus ticket before or after boarding, pay securely, and ride with a QR ticket.",
  icons: { icon: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
  applicationName: "Namma Ticket",
  appleWebApp: {
    capable: true,
    title: "Namma Ticket",
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
