"use client";

import { useUserContext } from "@/components/blocks/AFallback";
import BackNav from "@/components/blocks/BackNav";
import Notification from "@/components/blocks/Notification";
import EmptyFeed from "@/components/poem/EmptyFeed";
import Button from "@/components/ui/Button";
import { YStack } from "@/components/ui/Stack";
import { initialNumItems } from "@/constants/tokens";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";

export default function Notifications() {
	const {
		user: { _id: userId },
	} = useUserContext();

	const { isLoading, results, status, loadMore } = usePaginatedQuery(
		api.notifications.readNotifications,
		{ userId },
		{ initialNumItems },
	);

	if (isLoading) return null;

	return (
		<>
			<BackNav title="Notifications" />
			{results.length === 0 ? (
				<EmptyFeed />
			) : (
				<YStack className="items-start divide-y divide-neutral-200 dark:divide-neutral-800 gap-0">
					{results.map((notification) => (
						<Notification key={notification._id} notification={notification} />
					))}
				</YStack>
			)}
			{status === "CanLoadMore" && (
				<Button onClick={() => loadMore(initialNumItems)}>Load more</Button>
			)}
		</>
	);
}
