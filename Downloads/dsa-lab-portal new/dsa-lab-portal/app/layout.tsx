import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAC Lab Portal",
  description: "SIM Data Analytics Club — AI & ML Learning Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-900">{children}</body>
    </html>
  );
}
