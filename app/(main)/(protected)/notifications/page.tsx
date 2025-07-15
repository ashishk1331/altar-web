"use client";
import { useUserContext } from "@/components/blocks/AFallback";
import BackNav from "@/components/blocks/BackNav";
import Notification from "@/components/blocks/Notification";
import EmptyFeed from "@/components/poem/EmptyFeed";
import Button from "@/components/ui/Button";
import { YStack } from "@/components/ui/Stack";
import { initialNumItems } from "@/constants/tokens";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery, useMutation } from "convex/react";
import { useEffect } from "react";

export default function Notifications() {
	const {
		user: { _id: userId },
	} = useUserContext();

	const { isLoading, results, status, loadMore } = usePaginatedQuery(
		api.notifications.readNotifications,
		{ userId },
		{ initialNumItems },
	);

	const markAllAsRead = useMutation(api.notifications.markAllAsRead);

	// Mark all notifications as read when the page loads
	useEffect(() => {
		if (!isLoading && results.length > 0) {
			markAllAsRead({ userId });
		}
	}, [isLoading, results.length, markAllAsRead, userId]);

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
