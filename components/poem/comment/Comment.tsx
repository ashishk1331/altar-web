import { Crown, Ellipsis, Trash } from "lucide-react";
import Link from "next/link";
import Avatar from "@/components/blocks/Avatar";
import Button from "@/components/ui/Button";
import {
	DropdownContent,
	DropdownTrigger,
	DropdownWrapper,
} from "@/components/ui/Dropdown";
import { P } from "@/components/ui/Heading";
import { XStack, YStack } from "@/components/ui/Stack";
import { iconSize } from "@/constants/tokens";
import AFallback from "@/components/blocks/AFallback";
import { CommentWithAuthor } from "@/types/ComplexTypes";
import { formatDistance } from "date-fns";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAction } from "@/hooks/useAction";
import { callToast } from "@/components/ui/Toast";
import defaultAvatar from "@/public/default-avatar.webp";
import { Doc } from "@/convex/_generated/dataModel";

type CommentProps = {
	isAuthor: boolean;
	comment: CommentWithAuthor;
	poem: Doc<"poems">;
};

export default function Comment({
	isAuthor = false,
	comment,
	poem,
}: CommentProps) {
	const { _id: commentId, body, author, authorId, _creationTime } = comment;
	const { _id: poemId, authorId: poemAuthorId } = poem;

	const deleteComment = useMutation(api.comments.deleteComment);
	const { loading: isLoading, action: handleDelete } = useAction(
		async function () {
			await deleteComment({ commentId, poemId, poemAuthorId, authorId });
			callToast.success("Deleted your words.");
		},
	);

	return (
		<XStack className="w-full gap-4 items-start">
			<Avatar
				src={author?.picture ?? defaultAvatar}
				alt="image of user"
				width={64}
				variant="md"
			/>
			<YStack className="w-full items-start">
				<XStack className="w-full">
					<Link href={`/author/${authorId}`}>
						<P>
							{author?.firstName ?? ""} {author?.lastName ?? ""}
						</P>
					</Link>
					{isAuthor && (
						<Crown
							size={iconSize}
							className="stroke-transparent fill-indigo-500"
						/>
					)}
					<P className="text-neutral-400">
						{formatDistance(_creationTime, Date.now(), { addSuffix: true })}
					</P>
					<AFallback>
						{isAuthor && (
							<XStack className="ml-auto">
								<DropdownWrapper>
									<DropdownTrigger>
										<Ellipsis
											size={16}
											className="text-neutral-900 dark:text-neutral-100"
										/>
									</DropdownTrigger>
									<DropdownContent>
										<YStack className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded shadow-md">
											<Button
												isLoading={isLoading}
												disabled={isLoading}
												onClick={handleDelete}
												variant="outline"
												className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
											>
												<Trash size={iconSize} />
												<P>Delete</P>
											</Button>
										</YStack>
									</DropdownContent>
								</DropdownWrapper>
							</XStack>
						)}
					</AFallback>
				</XStack>
				<P>{body}</P>
			</YStack>
		</XStack>
	);
}
