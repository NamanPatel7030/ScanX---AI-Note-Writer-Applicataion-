import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    upgrade: v.boolean(),
  }),

  pdfFiles: defineTable({
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createBy: v.string(),
  }),

  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(), // Ensures metadata is an object
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),

  notes: defineTable({
    fileId: v.string(),
    notes: v.any(),
    createdBy: v.string(),
  }),
});
