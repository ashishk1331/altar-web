"use client";

import ProfileFront from "./ProfileFront";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AFallback from "../blocks/AFallback";
import Meta from "./Meta";
import { useUserStore } from "@/store/userStore";

type AuthorProfileProps = {
	authorId: Id<"users">;
};

export default function AuthorProfile({ authorId }: AuthorProfileProps) {
	const user = useUserStore((state) => state.user);
	const author = useQuery(api.users.readUser, { authorId, userId: user?._id });

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
