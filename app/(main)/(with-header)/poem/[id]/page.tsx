"use client";

import AFallback from "@/components/blocks/AFallback";
import CommentForm from "@/components/poem/comment/CommentForm";
import Forum from "@/components/poem/comment/Forum";
import Front from "@/components/poem/Front";
import PoemAction from "@/components/poem/PoemAction";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { use } from "react";

type PoemPageProps = {
	params: Promise<{ id: Id<"poems"> }>;
};

export default function PoemPage({ params }: PoemPageProps) {
	const { id: poemId } = use(params);
	const poem = useQuery(api.poems.readAPoem, { poemId });
	const comments = useQuery(api.comments.readCommentsOfPoem, { poemId });

	if (!poem || !comments) return null;

	return (
		<>
			<Front poem={poem} />
			<PoemAction poem={poem} />
			<AFallback>
				<CommentForm />
			</AFallback>
			<Forum comments={comments} />
		</>
	);
}
