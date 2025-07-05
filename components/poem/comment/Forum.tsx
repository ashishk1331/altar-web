import { H3 } from "@/components/ui/Heading";
import { YStack } from "@/components/ui/Stack";
import Comment from "./Comment";
import { useUserStore } from "@/store/userStore";
import { CommentWithAuthor } from "@/types/ComplexTypes";
import { Id } from "@/convex/_generated/dataModel";

type ForumProps = {
	comments: CommentWithAuthor[];
	poemId: Id<"poems">;
	authorId: Id<"users">;
};

export default function Forum({ comments, poemId, authorId }: ForumProps) {
	const user = useUserStore((state) => state.user);

	if (!comments || comments.length < 1 || !user) return null;

	return (
		<YStack className="gap-8 my-12 items-start">
			<H3>Comments</H3>
			{comments.map((comment) => (
				<Comment
					key={comment._id}
					poemId={poemId} authorId={authorId}
					isAuthor={user._id === comment.authorId}
					comment={comment}
				/>
			))}
		</YStack>
	);
}
