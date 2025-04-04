import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./sidenav";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Your Blog",
  description: "A personal blog platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body>
        <Providers>
          <TopNav />
          <main className="bg-gray-50 mx-auto  ">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
