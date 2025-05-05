import "./globals.css";
import { Montserrat } from "next/font/google";
import Provider from "./provider";
import { Toaster } from "../components/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react"
import AnalyticsGoogle from "./analytics";


const montserratFont = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "ScanX",
  description: "Generative Note Taker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      
      <AnalyticsGoogle />
      </head>
      
      <body className={montserratFont.className}>
        <Provider>{children}</Provider>
        <Toaster />
        <Analytics />

      </body>
    </html>
  );
}
