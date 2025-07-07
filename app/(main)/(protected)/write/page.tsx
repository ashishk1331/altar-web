"use client";

import BackNav from "@/components/blocks/BackNav";
import Button from "@/components/ui/Button";
import HR from "@/components/ui/HR";
import Textarea from "@/components/ui/Textarea";
import { api } from "@/convex/_generated/api";
import { useAction } from "@/hooks/useAction";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { callToast } from "@/components/ui/Toast";
import { XStack } from "@/components/ui/Stack";
import { useEditStore } from "@/store/editStore";
import { useShallow } from "zustand/shallow";
import { Id } from "@/convex/_generated/dataModel";

export default function Write() {
	const router = useRouter();
	const [draft, resetDraft] = useEditStore(
		useShallow((state) => [state.draft, state.reset]),
	);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const user = useUserStore((state) => state.user);
	const writePoem = useMutation(api.poems.writePoem);

	const { loading: isLoading, action: handleSubmit } = useAction(
		async function (isDraft: boolean, poemId?: Id<"poems">) {
			if (!title) {
				throw new Error("Give your work a `title`.");
			}
			if (!body) {
				throw new Error("Give your work a `body`.");
			}
			if (user) {
				const ID = await writePoem({
					title,
					body,
					authorId: user._id,
					isDraft,
					poemId,
				});
				if (!ID) throw new Error("Unable to create the poem.");
				callToast.success(isDraft ? "Draft saved." : "Work published.");
				resetDraft();
				router.replace("/home");
			}
		},
	);

	useEffect(() => {
		if (draft) {
			setTitle(draft.title);
			setBody(draft.body);
		}
	}, [draft])

	return (
		<>
			<BackNav
				title="Write"
				disableBack
				rightExtra={
					<XStack className="ml-auto gap-4">
						<Button
							variant="outline"
							disabled={!user || isLoading}
							onClick={() => handleSubmit(true, draft?._id)}
						>
							Draft
						</Button>
						<Button
							disabled={!user || isLoading}
							onClick={() => handleSubmit(false, draft?._id)}
						>
							Publish
						</Button>
					</XStack>
				}
			/>
			<Textarea
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="title here"
				className="bg-white mt-4"
				disabled={isLoading}
			/>
			<HR />
			<Textarea
				value={body}
				onChange={(e) => setBody(e.target.value)}
				placeholder="jot your thoughts here"
				className="bg-white mb-8 md:mb-16"
				disabled={isLoading}
			/>
		</>
	);
}
