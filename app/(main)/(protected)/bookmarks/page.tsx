"use client";

import BackNav from "@/components/blocks/BackNav";
import { useUserStore } from "@/store/userStore";
import BookmarkFeed from "@/components/feeds/BookmarkFeed";

export default function Bookmarks() {
	const user = useUserStore((state) => state.user);

	if (!user) return null;

	return (
		<>
			<BackNav title="Bookmarks" />
			<BookmarkFeed userId={user._id} />
		</>
	);
}
