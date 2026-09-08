import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sonclarus",
    template: "%s | Sonclarus",
  },
  description:
    "Upload audio, separate speakers, and get full text transcripts — powered by AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-[#0c0a09] text-[#e7e5e4]">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
