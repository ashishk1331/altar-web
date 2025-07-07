"use client";

import BackNav from "@/components/blocks/BackNav";
import FeedSkeleton from "@/components/home/FeedSkeleton";
import DraftsFeed from "@/components/poem/drafts/DraftsFeed";
import Button from "@/components/ui/Button";
import { initialNumItems } from "@/constants/tokens";
import { api } from "@/convex/_generated/api";
import { useUserStore } from "@/store/userStore";
import { usePaginatedQuery } from "convex/react";

export default function Drafts() {
	const user = useUserStore((state) => state.user);

	if (!user) return null;

	const { isLoading, loadMore, results, status } = usePaginatedQuery(
		api.poems.readDraftPoems,
		{ userId: user?._id },
		{ initialNumItems },
	);

	return (
		<>
			<BackNav title="Drafts" />
			{isLoading ? <FeedSkeleton /> : <DraftsFeed poems={results} />}
			{status === "CanLoadMore" && (
				<Button onClick={() => loadMore(initialNumItems)}>Load more</Button>
			)}
		</>
	);
}
