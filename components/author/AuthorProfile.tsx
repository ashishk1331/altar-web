"use client";

import ProfileFront from "./ProfileFront";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AFallback from "../blocks/AFallback";
import Meta from "./Meta";
import { useUserStore } from "@/store/userStore";

type AuthorWithFollowing = Doc<"users"> & { isFollowing: boolean };

type AuthorProfileProps = {
	authorId: Id<"users">;
	initialAuthor?: AuthorWithFollowing;
};

export default function AuthorProfile({
	authorId,
	initialAuthor,
}: AuthorProfileProps) {
	const user = useUserStore((state) => state.user);
	const liveAuthor = useQuery(api.users.readUser, {
		authorId,
		userId: user?._id,
	});
	const author = liveAuthor ?? initialAuthor;

	if (!author) return null;

	return (
		<>
			<ProfileFront author={author} />
			<AFallback>
				<Meta author={author} />
			</AFallback>
		</>
	);
}
