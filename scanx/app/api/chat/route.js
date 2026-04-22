import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize inside handler to always use latest env and avoid stale cached keys
function getModel() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

function isRateLimitError(err) {
  const msg = (err?.message || "").toLowerCase();
  return msg.includes("429") || msg.includes("resource_exhausted") || msg.includes("quota") || msg.includes("rate");
}

export async function POST(req) {
  try {
    const { message } = await req.json();
    const model = getModel();

    let result;
    let retries = 2;
    for (let i = 0; i <= retries; i++) {
      try {
        result = await model.generateContent(message);
        break;
      } catch (err) {
        if (isRateLimitError(err) && i < retries) {
          await new Promise((r) => setTimeout(r, 15000));
          continue;
        }
        throw err;
      }
    }

    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API error:", error);
    const isRate = isRateLimitError(error);
    const status = isRate ? 429 : 500;
    const msg = isRate
      ? "Rate limit exceeded. Please wait a moment and try again."
      : error.message || "AI request failed";
    return NextResponse.json({ error: msg }, { status });
  }
}
