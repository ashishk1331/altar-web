"use client";

import BackNav from "@/components/blocks/BackNav";
import Feed from "@/components/home/Feed";
import { useUserStore } from "@/store/userStore";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { initialNumItems } from "@/constants/tokens";
import Button from "@/components/ui/Button";
import FeedSkeleton from "@/components/home/FeedSkeleton";

export default function Bookmarks() {
	const user = useUserStore((state) => state.user);

	if (!user) return null;

	const { isLoading, loadMore, results, status } = usePaginatedQuery(
		api.bookmarks.readBookmarkedPoems,
		{ userId: user?._id },
		{ initialNumItems },
	);

	return (
		<>
			<BackNav title="Bookmarks" />
			{isLoading ? <FeedSkeleton /> : <Feed poems={results} />}
			{status === "CanLoadMore" && (
				<Button onClick={() => loadMore(initialNumItems)}>Load more</Button>
			)}
		</>
	);
}
