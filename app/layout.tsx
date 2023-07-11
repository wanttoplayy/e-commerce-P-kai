import "./globals.css";
import { Sarabun } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

import { ModalProvider } from "@/providers/modal-providers";
import { ToasterProvider } from "@/providers/toast-provider";

const sarabun = Sarabun({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={sarabun.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
