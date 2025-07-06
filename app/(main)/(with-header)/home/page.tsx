"use client";

import AFallback from "@/components/blocks/AFallback";
import Feed from "@/components/home/Feed";
import FeedSkeleton from "@/components/home/FeedSkeleton";
import Button from "@/components/ui/Button";
import { api } from "@/convex/_generated/api";
import { useUserStore } from "@/store/userStore";
import { usePaginatedQuery } from "convex/react";

export default function Home() {
	const user = useUserStore((state) => state.user);
	const { isLoading, results, status, loadMore } = usePaginatedQuery(
		api.poems.readPoems,
		{ userId: user?._id },
		{ initialNumItems: 10 },
	);

	if (isLoading) return <FeedSkeleton />;

	return (
		<>
			<Feed poems={results} />
			<AFallback>
				{status === "CanLoadMore" && (
					<Button onClick={() => loadMore(10)}>Load more</Button>
				)}
			</AFallback>
		</>
	);
}
