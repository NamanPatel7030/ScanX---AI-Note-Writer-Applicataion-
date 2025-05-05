import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";
export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  // handler: async (ctx, args) => {
  //   await ConvexVectorStore.fromTexts(
  //     args.splitText,
  //     args.fileId,
  //     new GoogleGenerativeAIEmbeddings({
  //       apiKey: process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY, // Use environment variable
  //       model: "text-embedding-004", // 768 dimensions
  //       taskType: TaskType.RETRIEVAL_DOCUMENT,
  //       title: "Document title",
  //     }),
  //     { ctx }
  //   );
  //   return "Ingested successfully";
  // },
  handler: async (ctx, args) => {
    try {
      const vectorStore = new ConvexVectorStore(
        new GoogleGenerativeAIEmbeddings({
          apiKey: process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY,
          model: "text-embedding-004",
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        }),
        { ctx }
      );
  
      const resultOne = (
        await vectorStore.similaritySearch(args.query, 1)
      ).filter((q) => q.metadata.fileId == args.fileId);
      
      console.log("Search results:", resultOne);
      return JSON.stringify(resultOne);
    } catch (error) {
      console.error("SearchAI action error:", error);
      throw new Error(`Search failed: ${error.message}`);
    }
  }
});
export const SearchAI = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY, // Use environment variable
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const resultOne = (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter((q) => q.metadata.fileId == args.fileId);
    console.log(resultOne);
    return JSON.stringify(resultOne);
  },
});
