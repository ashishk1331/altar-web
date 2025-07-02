"use client";

import Meta from "@/components/author/Meta";
import ProfileFront from "@/components/author/ProfileFront";
import Feed from "@/components/home/Feed";
import { useUserStore } from "@/store/userStore";

export default function AuthorPage() {
	const user = useUserStore((state) => state.user);

	return (
		<>
			<ProfileFront
				avatarURL={user?.picture || ""}
				firstName={user?.given_name || ""}
				lastName={user?.family_name || ""}
			/>
			<Meta />
			<hr className="text-neutral-200" />
			<Feed />
		</>
	);
}
