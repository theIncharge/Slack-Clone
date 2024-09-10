import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorised");
    }
    const joinCode = "123456";
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    return workspaceId;
  },
});
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    console.log(auth);
    if (!userId) {
      throw new Error("unauthorised");
    }
    return await ctx.db.get(args.id);
  },
});
