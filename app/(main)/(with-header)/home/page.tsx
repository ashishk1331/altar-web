"use client";

import AFallback from "@/components/blocks/AFallback";
import Feed from "@/components/home/Feed";
import FeedSkeleton from "@/components/home/FeedSkeleton";
import Button from "@/components/ui/Button";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";

export default function Home() {
	const { isLoading, results, status, loadMore } = usePaginatedQuery(
		api.poems.readPoems,
		{},
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
