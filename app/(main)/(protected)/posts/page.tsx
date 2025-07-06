"use client";

import BackNav from "@/components/blocks/BackNav";
import PostsFeed from "@/components/feeds/PostsFeed";
import { useUserStore } from "@/store/userStore";

export default function Posts() {
	const user = useUserStore((state) => state.user);

	if (!user) return null;

	return (
		<>
			<BackNav title="Posts" />
			<PostsFeed authorId={user._id} />
		</>
	);
}
