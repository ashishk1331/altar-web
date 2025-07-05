import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const readAPoem = query({
	args: { poemId: v.id("poems") },
	handler: async (ctx, args) => {
		const poem = await ctx.db.get(args.poemId);

		if (!poem) {
			return null;
		}

		const author = await ctx.db.get(poem.authorId);
		if (!author) {
			return null;
		}

		return { ...poem, author };
	},
});

export const readPoems = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const paginatedPoems = await ctx.db
			.query("poems")
			.order("desc")
			.paginate(args.paginationOpts);

		const poemsWithAuthors = await Promise.all(
			paginatedPoems.page.map(async (poem) => {
				const author = await ctx.db.get(poem.authorId);
				return {
					...poem,
					author: author || null,
				};
			}),
		);

		return {
			...paginatedPoems,
			page: poemsWithAuthors,
		};
	},
});

export const readPoemsByAuthor = query({
	args: { paginationOpts: paginationOptsValidator, authorId: v.id("users") },
	handler: async (ctx, args) =>
		await ctx.db
			.query("poems")
			.withIndex("by_author", (q) => q.eq("authorId", args.authorId))
			.order("desc")
			.paginate(args.paginationOpts),
});

export const writePoem = mutation({
	args: { title: v.string(), body: v.string(), authorId: v.id("users") },
	handler: async (ctx, args) =>
		await ctx.db.insert("poems", {
			title: args.title,
			body: args.body,
			authorId: args.authorId,
			likeCount: 0,
			commentCount: 0,
			isDraft: false,
		}),
});
