import "./globals.css";
import { Montserrat } from "next/font/google";
import Provider from "./provider";
import { Toaster } from "../components/components/ui/sonner";

const montserratFont = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "ScanX",
  description: "Generative Note Taker",
};

export default function RootLayouat({ children }) {
  return (
    <html lang="en">
      <body className={montserratFont.className}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
