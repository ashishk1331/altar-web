"use client";

import AFallback from "@/components/blocks/AFallback";
import CommentForm from "@/components/poem/comment/CommentForm";
import Forum from "@/components/poem/comment/Forum";
import PoemAction from "@/components/poem/PoemAction";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useUserStore } from "@/store/userStore";
import type { PoemWithAuthor } from "@/types/ComplexTypes";
import { useQuery } from "convex/react";

type PoemInteractiveProps = {
	poemId: Id<"poems">;
	initialPoem: PoemWithAuthor;
};

export default function PoemInteractive({
	poemId,
	initialPoem,
}: PoemInteractiveProps) {
	const user = useUserStore((state) => state.user);
	const livePoem = useQuery(api.poems.readAPoem, {
		poemId,
		userId: user?._id,
	});
	const comments = useQuery(api.comments.readCommentsOfPoem, { poemId });
	const poem = livePoem ?? initialPoem;

	return (
		<>
			<PoemAction poem={poem} />
			<AFallback>
				<CommentForm poem={poem} />
			</AFallback>
			{comments && <Forum poem={poem} comments={comments} />}
		</>
	);
}
