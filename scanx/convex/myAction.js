import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { Embeddings } from "@langchain/core/embeddings";
import { v } from "convex/values";

// Custom embeddings class for gemini-embedding-001 with 768 dimensions
class GeminiEmbeddings extends Embeddings {
  constructor({ apiKey }) {
    super({});
    this.apiKey = apiKey;
    this.model = "gemini-embedding-001";
    this.dimensions = 768;
  }

  async _embed(texts) {
    const requests = texts.map((text) => ({
      model: `models/${this.model}`,
      content: { parts: [{ text }] },
      outputDimensionality: this.dimensions,
    }));
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:batchEmbedContents?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requests }),
      }
    );
    if (!resp.ok) {
      const err = await resp.text();
      throw new Error(`Embedding API error: ${err}`);
    }
    const data = await resp.json();
    return data.embeddings.map((e) => e.values);
  }

  async embedDocuments(documents) {
    return this._embed(documents);
  }

  async embedQuery(text) {
    const [embedding] = await this._embed([text]);
    return embedding;
  }
}

function getEmbeddings() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  return new GeminiEmbeddings({ apiKey });
}

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.splitText.map(() => ({ fileId: args.fileId })),
      getEmbeddings(),
      { ctx }
    );
    return "Ingested successfully";
  },
});
export const SearchAI = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      getEmbeddings(),
      { ctx }
    );

    const resultOne = (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter((q) => q.metadata.fileId == args.fileId);
    console.log(resultOne);
    return JSON.stringify(resultOne);
  },
});
