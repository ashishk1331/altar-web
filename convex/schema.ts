import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	poems: defineTable({
		title: v.string(),
		body: v.string(),
		authorId: v.id("users"),
		likeCount: v.number(),
		commentCount: v.number(),
		isDraft: v.boolean(),
	})
		.index("by_author", ["authorId"])
		.index("by_author_and_is_draft", ["authorId", "isDraft"]),

	bookmarks: defineTable({
		poemId: v.id("poems"),
		authorId: v.id("users"),
	}).index("by_author", ["authorId"]),

	users: defineTable({
		email: v.string(),
		bio: v.string(),
		name: v.string(),
		firstName: v.string(),
		lastName: v.string(),
		picture: v.string(),
		followerCount: v.number(),
		followingCount: v.number(),
		postCount: v.number(),
	}).index("by_email", ["email"]),

	followers: defineTable({
		followee: v.id("users"),
		follower: v.id("users"),
	}).index("by_followee", ["followee"]),

	comments: defineTable({
		poemId: v.id("poems"),
		authorId: v.id("users"),
		body: v.string(),
	}).index("by_poem", ["poemId"]),

	likes: defineTable({
		poemId: v.id("poems"),
		authorId: v.id("users"),
	}).index("by_poem", ["poemId"]),
});
