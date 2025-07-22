import { api } from "@/convex/_generated/api";
import { NotificationWithNames } from "@/types/ComplexTypes";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { XStack } from "../ui/Stack";
import { Heart, MessageSquare } from "lucide-react";
import { debounceDelay, iconSize } from "@/constants/tokens";
import { useDebouncedCallback } from "use-debounce";

interface NotificationProps {
	notification: NotificationWithNames;
}

export default function Notification({ notification }: NotificationProps) {
	const markAsRead = useMutation(api.notifications.markAsRead);
	const markAsReadWithDelay = useDebouncedCallback(() => {
		markAsRead({ notificationId: notification._id });
	}, debounceDelay * 20);

	useEffect(() => {
		if (!notification.read) {
			markAsReadWithDelay();
		}
	}, [notification.read, notification._id, markAsRead, markAsReadWithDelay]);

	const getActionText = () => {
		switch (notification.type) {
			case "like":
				return "liked your poem";
			case "comment":
				return "commented on your poem";
			default:
				return "interacted with your poem";
		}
	};

	return (
		<XStack
			className={twMerge(
				"p-4 w-full flex-wrap gap-1",
				notification.read
					? "bg-white dark:bg-neutral-950"
					: "bg-indigo-50 dark:bg-blue-900/20",
			)}
		>
			{notification.type === "like" ? (
				<Heart size={iconSize} className="fill-red-500 stroke-red-500" />
			) : notification.type === "comment" ? (
				<MessageSquare
					size={iconSize}
					className="fill-indigo-500 stroke-indigo-500"
				/>
			) : null}
			<span className="font-medium ml-2">
				<a
					href={`/author/${notification.fromAuthor?._id}`}
					className="underline underline-offset-2"
				>
					{`${notification.fromAuthor?.firstName} ${notification.fromAuthor?.lastName}`}
				</a>
			</span>
			
			{getActionText().split(" ").map((word) => <span key={word} className="text-neutral-600 dark:text-neutral-400">{word}</span>)}
			
			<span className="font-medium">
				<a
					href={`/poem/${notification.poem?._id}`}
					className="underline underline-offset-2"
				>
					{notification.poem?.title}
				</a>
			</span>
		</XStack>
	);
}
