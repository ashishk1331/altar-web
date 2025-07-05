"use client";

import { UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { iconSize } from "@/constants/tokens";
import Button from "../ui/Button";
import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";
import { Doc } from "@/convex/_generated/dataModel";
import AFallback from "../blocks/AFallback";
import { useUserStore } from "@/store/userStore";

type MetaProps = {
	author: Doc<"users">;
};

export default function Meta({ author }: MetaProps) {
	const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false);
	const { postCount, _id: authorId } = author;

	let isAuthorHimself = false;
	const user = useUserStore((state) => state.user);

	if (user) {
		isAuthorHimself = user._id === authorId;
	}

	return (
		<XStack className="justify-between my-4">
			<P>
				Posts <b>{postCount}</b>
			</P>
			<AFallback>
				{!isAuthorHimself && (
					<Button
						onClick={() => setIsAlreadyFollowed((prev) => !prev)}
						className={
							isAlreadyFollowed
								? "bg-neutral-300 text-black hover:bg-neutral-200"
								: ""
						}
					>
						{isAlreadyFollowed && <UserRoundCheck size={iconSize - 4} />}
						<span>{isAlreadyFollowed ? "Followed" : "Follow"}</span>
					</Button>
				)}
			</AFallback>
		</XStack>
	);
}
