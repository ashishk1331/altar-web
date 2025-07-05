"use client";

import ProfileFront from "./ProfileFront";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AFallback from "../blocks/AFallback";
import Meta from "./Meta";

type AuthorProfileProps = {
	authorId: Id<"users">;
};

export default function AuthorProfile({ authorId }: AuthorProfileProps) {
	const user = useQuery(api.users.readUser, { authorId });

	if (!user) return null;

	return (
		<>
			<ProfileFront author={user} />
			<AFallback>
				<Meta author={user} />
			</AFallback>
		</>
	);
}
