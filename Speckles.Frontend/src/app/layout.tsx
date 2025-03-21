import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export const metadata: Metadata = {
  title: "Speckles",
  description: "Place for studios",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="antialiased">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
