import { Bookmark, BookmarkCheck, Heart, MessageSquare } from "lucide-react";
import { twJoin } from "tailwind-merge";
import { iconSize } from "@/constants/tokens";
import Button from "../ui/Button";
import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";
import AFallback from "../blocks/AFallback";

export default function IconsTray() {
	const isAlreadyBookmarked = false;
	const isAlreadyLiked = false;

	return (
		<XStack className="w-full">
			<Button
				variant="outline"
				className={twJoin(isAlreadyBookmarked && "hover:bg-red-50")}
			>
				<Heart
					size={iconSize}
					className={isAlreadyLiked ? "fill-red-500 text-red-500" : ""}
				/>
				<P>122</P>
			</Button>
			<Button variant="outline">
				<MessageSquare size={iconSize} />
				<P>8</P>
			</Button>
			<AFallback>
				<Button
					variant="icon"
					className={twJoin(
						"ml-auto",
						isAlreadyBookmarked && "hover:bg-indigo-50",
					)}
				>
					{isAlreadyBookmarked ? (
						<BookmarkCheck size={iconSize} className="text-indigo-500" />
					) : (
						<Bookmark size={iconSize} className="text-black" />
					)}
				</Button>
			</AFallback>
		</XStack>
	);
}
