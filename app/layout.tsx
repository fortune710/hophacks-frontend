import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Immerxiv",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body className={inter.className}>
            {children}
          </body>
        </ThemeProvider>

      </UserProvider>
    </html>
  );
}
