import { CircleCheck, Ellipsis, Trash } from "lucide-react";
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
import { Doc } from "@/convex/_generated/dataModel";
import { CommentWithAuthor } from "@/types/ComplexTypes";
import { formatDistance } from "date-fns";

type CommentProps = {
	isAuthor: boolean;
	comment: CommentWithAuthor;
};

export default function Comment({ isAuthor = false, comment }: CommentProps) {
	const {
		body,
		author: { name },
		authorId,
		_creationTime,
	} = comment;

	return (
		<XStack className="w-full gap-4 items-start">
			<Avatar
				src="https://picsum.photos/100"
				alt="image of user"
				width={64}
				variant="md"
			/>
			<YStack className="w-full">
				<XStack className="w-full">
					<Link href={`/author/${authorId}`}>
						<P>{name}</P>
					</Link>
					{isAuthor && (
						<CircleCheck size={iconSize - 4} className="text-black" />
					)}
					<P className="text-neutral-400">
						{formatDistance(_creationTime, Date.now(), { addSuffix: true })}
					</P>
					<AFallback>
						<XStack className="ml-auto">
							<DropdownWrapper>
								<DropdownTrigger>
									<Ellipsis size={16} className="text-black" />
								</DropdownTrigger>
								<DropdownContent>
									<YStack className="p-2 bg-white rounded shadow-md mr-2">
										<Button
											variant="outline"
											className="text-red-500 hover:bg-red-50"
										>
											<Trash size={iconSize - 4} />
											<P>Delete</P>
										</Button>
									</YStack>
								</DropdownContent>
							</DropdownWrapper>
						</XStack>
					</AFallback>
				</XStack>
				<P>{body}</P>
			</YStack>
		</XStack>
	);
}
