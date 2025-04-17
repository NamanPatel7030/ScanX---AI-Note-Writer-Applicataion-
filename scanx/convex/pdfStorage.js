import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    createBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      storageId: args.storageId,
      fileName: args.fileName,
      createBy: args.createBy,
      fileUrl: args.fileUrl, //add fileUrl column to pdfFiles table and update this field in this mutation.  This field will store the URL of uploaded file.  You can fetch this URL using getFileUrl mutation.  This URL can be used to display the uploaded file in frontend.  You can use any library or service to fetch the file from this URL.  For example, you can use Axios to fetch the file and display it in a <img> tag
    });
    return "inserted";
  },
});

export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    console.log(result);
    return result[0];
  },
});

export const GetUserFiles = query({
  args: { userEmail: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args?.userEmail) {
      return;
    }

    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createBy"), args?.userEmail)) // Using index
      .collect();

    return result;
  },
});
