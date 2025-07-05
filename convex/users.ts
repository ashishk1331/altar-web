import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const upsertUser = mutation({
	args: {
		email: v.string(),
		name: v.string(),
		firstName: v.string(),
		lastName: v.string(),
		picture: v.string(),
	},
	handler: async (ctx, args) => {
		const user = {
			email: args.email,
			name: args.name,
			firstName: args.firstName,
			lastName: args.lastName,
			picture: args.picture,
			bio: "",
			followerCount: 0,
			followingCount: 0,
			postCount: 0,
		};
		const existing = await ctx.db
			.query("users")
			.withIndex("by_email", (q) => q.eq("email", args.email))
			.first();

		if (!existing) {
			const Id = await ctx.db.insert("users", user);
			return { _id: Id, _creationTime: Date.now(), ...user };
		}
		return existing;
	},
});

export const readUser = query({
	args: { authorId: v.id("users") },
	handler: async (ctx, args) => await ctx.db.get(args.authorId),
});
