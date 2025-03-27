import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./sidenav";

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
        <TopNav />
        <main className=" mx-auto mt-10 ">{children}</main>
      </body>
    </html>
  );
}
