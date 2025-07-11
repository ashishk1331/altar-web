"use client";

import { useUserContext } from "@/components/blocks/AFallback";
import BackNav from "@/components/blocks/BackNav";
import Issue from "@/components/blocks/Issue";
import EmptyFeed from "@/components/poem/EmptyFeed";
import Button from "@/components/ui/Button";
import { H3 } from "@/components/ui/Heading";
import { initialNumItems } from "@/constants/tokens";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";

export default function IssuesPage() {
	const {
		user: { _id: authorId },
	} = useUserContext();
	const { isLoading, results, status, loadMore } = usePaginatedQuery(
		api.issues.getIssuesByUser,
		{ authorId },
		{ initialNumItems },
	);

	return (
		<>
			<BackNav title="All Issues" />
			{!isLoading &&
				(results.length === 0 ? (
					<EmptyFeed />
				) : (
					<>
						<H3 className="my-4 font-normal">Issues ({results.length})</H3>
						{results.map((issue) => (
							<Issue key={issue._id} issue={issue} />
						))}
						{status === "CanLoadMore" && (
							<Button onClick={() => loadMore(initialNumItems)}>
								Load More
							</Button>
						)}
					</>
				))}
		</>
	);
}
