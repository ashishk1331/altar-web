import { NotificationWithNames } from "@/types/ComplexTypes";
import { XStack } from "../ui/Stack";
import { Heart, MessageSquare } from "lucide-react";
import { iconSize } from "@/constants/tokens";
import { P } from "../ui/Heading";
import { twJoin } from "tailwind-merge";

type NotificationProps = {
	notification: NotificationWithNames;
};

export default function Notification({ notification }: NotificationProps) {
	const { fromAuthorName, fromAuthorId, poemTitle, poemId, type } =
		notification;

	return (
		<XStack className={twJoin("w-full p-4 gap-4 rounded")}>
			{type === "like" ? (
				<Heart size={iconSize * 1.2} className="fill-red-500 stroke-red-500" />
			) : (
				<MessageSquare
					size={iconSize * 1.2}
					className="fill-indigo-500 stroke-indigo-500"
				/>
			)}

			<XStack className="flex-wrap">
				<a href={`/author/${fromAuthorId}`} className="hover:underline">
					<P>
						<b>{fromAuthorName}</b>
					</P>
				</a>
				<P>{type === "like" ? "liked" : "commented on"}</P>
				<a href={`/poem/${poemId}`} className="hover:underline">
					<P>
						<b>{poemTitle}</b>
					</P>
				</a>
			</XStack>
		</XStack>
	);
}
