import { Doc } from "@/convex/_generated/dataModel";

export type CommentWithAuthor = Doc<"comments"> & { author: Doc<"users"> };

export type PoemWithAuthor = Doc<"poems"> & {
	author: Doc<"users"> | null;
	isBookmarked: boolean;
	isLiked: boolean;
};
