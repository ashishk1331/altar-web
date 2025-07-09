import { query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "./functions";

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
					author,
				};
			}),
		);

		return commentsWithAuthors;
	},
});

export const writeComment = mutation({
	args: { poemId: v.id("poems"), body: v.string(), authorId: v.id("users") },
	handler: async (ctx, args) =>
		await ctx.db.insert("comments", {
			poemId: args.poemId,
			authorId: args.authorId,
			body: args.body,
		}),
});

export const deleteComment = mutation({
	args: { commentId: v.id("comments") },
	handler: async (ctx, args) => await ctx.db.delete(args.commentId),
});
