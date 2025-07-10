"use client";

import { usePaginatedQuery } from "convex/react";
import Feed from "../home/Feed";
import { api } from "@/convex/_generated/api";
import { initialNumItems } from "@/constants/tokens";
import FeedSkeleton from "../home/FeedSkeleton";
import Button from "../ui/Button";
import AFallback from "../blocks/AFallback";
import { Id } from "@/convex/_generated/dataModel";
import { useUserStore } from "@/store/userStore";
import EmptyFeed from "../poem/EmptyFeed";

type AuthorFeedProps = {
	authorId: Id<"users">;
};

export default function AuthorFeed({ authorId }: AuthorFeedProps) {
	const user = useUserStore((state) => state.user);
	const { results, isLoading, status, loadMore } = usePaginatedQuery(
		api.poems.readPoemsByAuthor,
		{ authorId, userId: user?._id },
		{ initialNumItems },
	);

	if (isLoading) return <FeedSkeleton />;

	if (results.length === 0)
		return <EmptyFeed message="Written no poems yet." />;

	return (
		<>
			<Feed poems={results} />
			<AFallback>
				{status === "CanLoadMore" && (
					<Button onClick={() => loadMore(initialNumItems)}>Load More</Button>
				)}
			</AFallback>
		</>
	);
}
