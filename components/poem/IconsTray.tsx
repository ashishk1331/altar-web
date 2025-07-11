import {
	Bookmark,
	BookmarkCheck,
	Heart,
	MessageSquare,
	Share,
} from "lucide-react";
import { twJoin } from "tailwind-merge";
import { iconSize, debounceDelay } from "@/constants/tokens";
import Button from "../ui/Button";
import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";
import AFallback, { useUserContext } from "../blocks/AFallback";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { callToast } from "../ui/Toast";
import { PoemWithAuthor } from "@/types/ComplexTypes";
import { CopyToClipboard } from "react-copy-to-clipboard";

type IconsTrayProps = {
	poem: PoemWithAuthor;
};

export default function IconsTray({ poem }: IconsTrayProps) {
	const {
		user: { _id: userId },
	} = useUserContext();
	const {
		isBookmarked: isAlreadyBookmarked,
		isLiked: isAlreadyLiked,
		_id: poemId,
		likeCount,
		commentCount,
	} = poem;

	const addBookmark = useMutation(api.bookmarks.addBookmark);
	const removeBookmark = useMutation(api.bookmarks.removeBookmark);
	const [isBookmarked, setIsBookmarked] = useState(isAlreadyBookmarked);
	const handleBookmarkChange = useDebouncedCallback(async () => {
		if (isBookmarked) {
			await removeBookmark({ authorId: userId, poemId });
			callToast.success("Removed from bookmarks.");
		} else {
			await addBookmark({ authorId: userId, poemId });
			callToast.success("Added to bookmarks.");
		}
		setIsBookmarked(!isBookmarked);
	}, debounceDelay);

	const likePoem = useMutation(api.likes.likePoem);
	const dislikePoem = useMutation(api.likes.dislikePoem);
	const [isLiked, setIsLiked] = useState(isAlreadyLiked);
	const handleLikeDislike = useDebouncedCallback(async () => {
		if (isLiked) {
			await dislikePoem({ authorId: userId, poemId });
		} else {
			await likePoem({ authorId: userId, poemId });
		}
		setIsLiked(!isLiked);
	}, debounceDelay);

	return (
		<XStack className="w-full">
			<Button
				variant="outline"
				onClick={handleLikeDislike}
				className={twJoin(isLiked && "hover:bg-red-50")}
			>
				<Heart
					size={iconSize}
					className={isLiked ? "fill-red-500 text-red-500" : ""}
				/>
				{likeCount > 0 && <P>{likeCount}</P>}
			</Button>
			<XStack className="px-2">
				<MessageSquare size={iconSize} />
				{commentCount > 0 && <P>{commentCount}</P>}
			</XStack>
			<CopyToClipboard
				text={`Read ${poem.title} by ${poem.author?.name} on https://thealtar.vercel.app/poem/${poem._id}`}
				onCopy={() => callToast.success("Copied to clipboard.")}
			>
				<Button variant="icon" className="ml-auto">
					<Share size={iconSize} />
				</Button>
			</CopyToClipboard>
			<AFallback>
				<Button
					variant="icon"
					onClick={handleBookmarkChange}
					className={twJoin(isBookmarked && "hover:bg-indigo-50")}
				>
					{isBookmarked ? (
						<BookmarkCheck size={iconSize} className="text-indigo-500" />
					) : (
						<Bookmark size={iconSize} className="text-black" />
					)}
				</Button>
			</AFallback>
		</XStack>
	);
}
