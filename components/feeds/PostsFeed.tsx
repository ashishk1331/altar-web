import { Id } from "@/convex/_generated/dataModel";
import Feed from "../home/Feed";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import FeedSkeleton from "../home/FeedSkeleton";
import { initialNumItems } from "@/constants/tokens";
import Button from "../ui/Button";

type PostsFeedProps = {
	authorId: Id<"users">;
};

export default function PostsFeed({ authorId }: PostsFeedProps) {
	const { isLoading, loadMore, results, status } = usePaginatedQuery(
		api.poems.readPoemsByAuthor,
		{ authorId },
		{ initialNumItems },
	);

	if (isLoading) return <FeedSkeleton />;

	return (
		<>
			<Feed showSettings={true} poems={results}></Feed>
			{status === "CanLoadMore" && (
				<Button onClick={() => loadMore(10)}>Load more</Button>
			)}
		</>
	);
}
