import { query } from "./_generated/server";
import { v } from "convex/values";

export const readCommentsOfPoem = query({
	args: { poemId: v.id("poems") },
	handler: async (ctx, args) => {
		const comments = await ctx.db
			.query("comments")
			.withIndex("by_poem", (q) => q.eq("poemId", args.poemId))
			.order("desc")
			.collect();

		const commentsWithAuthors = await Promise.all(
			comments.map(async (comment) => {
				const author = await ctx.db.get(comment.authorId);
				return {
					...comment,
					author: author || null,
				};
			}),
		);

		return commentsWithAuthors;
	},
});