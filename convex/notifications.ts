import { query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const readNotifications = query({
	args: {
		userId: v.id("users"),
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		const paginatedNotifications = await ctx.db
			.query("notifications")
			.withIndex("by_author", (q) => q.eq("authorId", args.userId))
			.order("desc")
			.paginate(args.paginationOpts);

		const notificationsWithDetails = await Promise.all(
			paginatedNotifications.page.map(async (notification) => {
				const [poem, fromAuthor] = await Promise.all([
					ctx.db.get(notification.poemId),
					ctx.db.get(notification.fromAuthorId),
				]);

				return {
					...notification,
					poemTitle: poem?.title || null,
					fromAuthorName: fromAuthor?.name || null,
				};
			}),
		);

		return {
			...paginatedNotifications,
			page: notificationsWithDetails,
		};
	},
});
