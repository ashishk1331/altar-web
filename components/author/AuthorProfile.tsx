"use client";

import ProfileFront from "./ProfileFront";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type AuthorProfileProps = {
	authorId: Id<"users">;
};

export default function AuthorProfile({ authorId }: AuthorProfileProps) {
	const user = useQuery(api.users.readUser, { authorId });

	if (!user) return null;

	return (
		<ProfileFront
			avatarURL={user.picture}
			firstName={user.firstName}
			lastName={user.lastName}
			bio={user.bio}
		/>
	);
}
