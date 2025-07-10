import { initialNumItems } from "@/constants/tokens";
import Feed from "../home/Feed";
import FeedSkeleton from "../home/FeedSkeleton";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import Button from "../ui/Button";
import EmptyFeed from "../poem/EmptyFeed";

type BookmarkFeedProps = {
	userId: Id<"users">;
};

export default function BookmarkFeed({ userId }: BookmarkFeedProps) {
	const { isLoading, loadMore, results, status } = usePaginatedQuery(
		api.bookmarks.readBookmarkedPoems,
		{ userId },
		{ initialNumItems },
	);

	return (
		<>
			{isLoading ? (
				<FeedSkeleton />
			) : results.length === 0 ? (
				<EmptyFeed />
			) : (
				<Feed poems={results} />
			)}
			{status === "CanLoadMore" && (
				<Button onClick={() => loadMore(initialNumItems)}>Load more</Button>
			)}
		</>
	);
}
