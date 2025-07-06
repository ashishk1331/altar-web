import { v } from "convex/values";
import { mutation } from "./functions";

export const addBookmark = mutation({
	args: { authorId: v.id("users"), poemId: v.id("poems") },
	handler: async (ctx, args) =>
		await ctx.db.insert("bookmarks", {
			authorId: args.authorId,
			poemId: args.poemId,
		}),
});

export const removeBookmark = mutation({
	args: { authorId: v.id("users"), poemId: v.id("poems") },
	handler: async (ctx, args) => {
		const bookmark = await ctx.db
			.query("bookmarks")
			.filter((q) =>
				q.and(
					q.eq(q.field("poemId"), args.poemId),
					q.eq(q.field("authorId"), args.authorId),
				),
			)
			.first();

		if (!bookmark) throw new Error("Bookmark not found.");

		await ctx.db.delete(bookmark._id);
	},
});
