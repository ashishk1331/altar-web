import { H3 } from "@/components/ui/Heading";
import { YStack } from "@/components/ui/Stack";
import Comment from "./Comment";
import { useUserStore } from "@/store/userStore";
import { CommentWithAuthor } from "@/types/ComplexTypes";

type ForumProps = {
	comments: CommentWithAuthor[];
};

export default function Forum({ comments }: ForumProps) {
	const user = useUserStore((state) => state.user);

	if (!comments || comments.length < 1 || !user) return null;

	return (
		<YStack className="gap-8 my-12 items-start">
			<H3>Comments</H3>
			{comments.map((comment) => (
				<Comment
					key={comment._id}
					isAuthor={user._id === comment.authorId}
					comment={comment}
				/>
			))}
		</YStack>
	);
}
