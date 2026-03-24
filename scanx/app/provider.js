"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider } from "@clerk/nextjs";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ThemeProvider } from "next-themes";

function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ConvexProvider client={convex}>
          <PayPalScriptProvider
            options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
          >
            {children}
          </PayPalScriptProvider>
        </ConvexProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default Provider;
