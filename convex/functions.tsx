import { DataModel } from "./_generated/dataModel";
import { Triggers } from "convex-helpers/server/triggers";
import {
	mutation as rawMutation,
	internalMutation as rawInternalMutation,
} from "./_generated/server";
import {
	customCtx,
	customMutation,
} from "convex-helpers/server/customFunctions";

const triggers = new Triggers<DataModel>();

triggers.register("comments", async (ctx, change) => {
	if (change.operation === "insert") {
		const { poemId } = change.newDoc;
		const poem = await ctx.db.get(poemId);
		if (poem) {
			const newCommentCount = (poem.commentCount ?? 0) + 1;
			await ctx.db.patch(poemId, { commentCount: newCommentCount });
		}
	} else if (change.operation === "delete") {
		const { poemId } = change.oldDoc;
		const poem = await ctx.db.get(poemId);
		if (poem) {
			const newCommentCount = Math.max(0, (poem.commentCount ?? 0) - 1);
			await ctx.db.patch(poemId, { commentCount: newCommentCount });
		}
	}
});

triggers.register("likes", async (ctx, change) => {
	if (change.operation === "insert") {
		const { poemId } = change.newDoc;
		const poem = await ctx.db.get(poemId);
		if (poem) {
			const newLikeCount = (poem.likeCount ?? 0) + 1;
			await ctx.db.patch(poemId, { likeCount: newLikeCount });
		}
	} else if (change.operation === "delete") {
		const { poemId } = change.oldDoc;
		const poem = await ctx.db.get(poemId);
		if (poem) {
			const newLikeCount = Math.max(0, (poem.likeCount ?? 0) - 1);
			await ctx.db.patch(poemId, { likeCount: newLikeCount });
		}
	}
});

triggers.register("followers", async (ctx, change) => {
	switch (change.operation) {
		case "insert": {
			const { followee, follower } = change.newDoc;

			// Increase follower count
			const followerProfile = await ctx.db.get(follower);
			if (followerProfile) {
				const newFollowerCount = Math.max(
					0,
					(followerProfile.followerCount ?? 0) - 1,
				);
				await ctx.db.patch(follower, { followerCount: newFollowerCount });
			}

			// Increase following count
			const followeeProfile = await ctx.db.get(followee);
			if (followeeProfile) {
				const newFollowerCount = Math.max(
					0,
					(followeeProfile.followingCount ?? 0) - 1,
				);
				await ctx.db.patch(follower, { followerCount: newFollowerCount });
			}

			break;
		}

		case "delete": {
			const { followee, follower } = change.oldDoc;

			// Decrease follower count
			const followerProfile = await ctx.db.get(follower);
			if (followerProfile) {
				const newFollowerCount = (followerProfile.followerCount ?? 0) + 1;
				await ctx.db.patch(follower, { followerCount: newFollowerCount });
			}

			// Decrease following count
			const followeeProfile = await ctx.db.get(followee);
			if (followeeProfile) {
				const newFollowerCount = (followeeProfile.followingCount ?? 0) + 1;
				await ctx.db.patch(follower, { followerCount: newFollowerCount });
			}

			break;
		}
	}
});

triggers.register("poems", async (ctx, change) => {
	switch (change.operation) {
		case "insert": {
			const { authorId } = change.newDoc;
			const author = await ctx.db.get(authorId);
			if (author) {
				const newPostCount = (author.postCount ?? 0) + 1;
				await ctx.db.patch(authorId, { postCount: newPostCount });
			}

			break;
		}
		case "delete": {
			const { authorId } = change.oldDoc;
			const author = await ctx.db.get(authorId);
			if (author) {
				const newPostCount = Math.max(0, (author.postCount ?? 0) - 1);
				await ctx.db.patch(authorId, { postCount: newPostCount });
			}

			break;
		}
	}
});

export const mutation = customMutation(rawMutation, customCtx(triggers.wrapDB));
export const internalMutation = customMutation(
	rawInternalMutation,
	customCtx(triggers.wrapDB),
);
