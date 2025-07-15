import { Doc } from "@/convex/_generated/dataModel";

export type CommentWithAuthor = Doc<"comments"> & {
	author: Doc<"users"> | null;
};

export type PoemWithAuthor = Doc<"poems"> & {
	author: Doc<"users"> | null;
	isBookmarked?: boolean;
	isLiked?: boolean;
};

export type NotificationWithNames = Doc<"notifications"> & {
	poem: Doc<"poems"> | null;
	fromAuthor: Doc<"users"> | null;
};
