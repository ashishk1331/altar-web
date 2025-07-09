"use client";

import BackNav from "@/components/blocks/BackNav";
import DraftFeed from "@/components/feeds/DraftFeed";
import { useUserStore } from "@/store/userStore";

export default function Drafts() {
	const user = useUserStore((state) => state.user);

	if (!user) return null;

	return (
		<>
			<BackNav title="Drafts" />
			<DraftFeed userId={user._id} />
		</>
	);
}
