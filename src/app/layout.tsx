import "./globals.css";
import { cn } from "@/src/lib/utils";
import { Roboto } from "next/font/google";
const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", roboto.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
