import { v } from "convex/values";
import { mutation } from "./functions";

export const likePoem = mutation({
	args: { authorId: v.id("users"), poemId: v.id("poems") },
	handler: async (ctx, args) =>
		await ctx.db.insert("likes", {
			authorId: args.authorId,
			poemId: args.poemId,
		}),
});

export const dislikePoem = mutation({
	args: { authorId: v.id("users"), poemId: v.id("poems") },
	handler: async (ctx, args) => {
		const likeRecord = await ctx.db
			.query("likes")
			.filter((q) =>
				q.and(
					q.eq(q.field("poemId"), args.poemId),
					q.eq(q.field("authorId"), args.authorId),
				),
			)
			.first();

		if (!likeRecord) throw new Error("Record not found.");

		await ctx.db.delete(likeRecord._id);
	},
});
