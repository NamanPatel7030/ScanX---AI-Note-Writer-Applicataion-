import "./globals.css";
import { Montserrat } from "next/font/google";
import Provider from "./provider";
import { Toaster } from "../components/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const montserratFont = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "ScanX",
  description: "Generative Note Taker",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={montserratFont.className}>
        <Provider>{children}</Provider>
        <Toaster />
        <Analytics />
        
      </body>
    </html>
  );
}
