"use client";

import BackNav from "@/components/blocks/BackNav";
import Button from "@/components/ui/Button";
import HR from "@/components/ui/HR";
import Textarea from "@/components/ui/Textarea";
import { api } from "@/convex/_generated/api";
import { useAction } from "@/hooks/useAction";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { callToast } from "@/components/ui/Toast";

export default function Write() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const user = useUserStore((state) => state.user);
	const writePoem = useMutation(api.poems.writePoem);

	const { loading: isLoading, action: handleSubmit } = useAction(
		async function () {
			if (!title) {
				throw new Error("Give your work a `title`.");
			}
			if (!body) {
				throw new Error("Give your work a `body`.");
			}
			if (user) {
				const ID = await writePoem({ title, body, authorId: user._id });
				if (!ID) throw new Error("Unable to create the poem.");
				callToast.success("Work published.");
				router.replace("/home");
			}
		},
	);

	return (
		<>
			<BackNav
				title="Write"
				disableBack
				rightExtra={
					<Button disabled={!user} onClick={handleSubmit} className="ml-auto">
						Publish
					</Button>
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
				className="bg-white"
				disabled={isLoading}
			/>
		</>
	);
}
