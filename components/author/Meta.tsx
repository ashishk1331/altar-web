"use client";

import { Share, UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { debounceDelay, iconSize } from "@/constants/tokens";
import Button from "../ui/Button";
import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";
import { Doc } from "@/convex/_generated/dataModel";
import AFallback, { useUserContext } from "../blocks/AFallback";
import { useDebouncedCallback } from "use-debounce";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { callToast } from "../ui/Toast";
import CopyToClipboard from "react-copy-to-clipboard";

type MetaProps = {
	author: Doc<"users"> & { isFollowing: boolean };
};

export default function Meta({ author }: MetaProps) {
	const { user } = useUserContext();
	const { postCount, _id: authorId, isFollowing } = author;

	const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(
		isFollowing || false,
	);
	const isAuthorHimself = user._id === authorId;

	const followAuthor = useMutation(api.followers.followAuthor);
	const unfollowAuthor = useMutation(api.followers.unfollowAuthor);
	const [isBusy, setIsBusy] = useState(false);
	const handleFollow = useDebouncedCallback(async function () {
		if (isBusy) return;
		setIsBusy(true);

		try {
			if (isAlreadyFollowed) {
				await unfollowAuthor({ followee: authorId, follower: user._id });
				callToast.success(`No more from ${author.name}`);
			} else {
				await followAuthor({ followee: authorId, follower: user._id });
				callToast.success(`Following ${author.name}`);
			}
			setIsAlreadyFollowed(!isAlreadyFollowed);
		} finally {
			setIsBusy(false);
		}
	}, debounceDelay);

	return (
		<XStack className="justify-between my-4">
			<P>
				Posts <b>{postCount}</b>
			</P>
			<XStack className="gap-4">
				<CopyToClipboard
					text={`Read poems by ${author.name} on https://thealtar.vercel.app/author/${authorId}`}
					onCopy={() => callToast.success("Copied to clipboard.")}
				>
					<Button variant="icon">
						<Share size={iconSize} />
					</Button>
				</CopyToClipboard>
				<AFallback>
					{!isAuthorHimself && (
						<Button
							isLoading={isBusy}
							disabled={isBusy}
							onClick={handleFollow}
							className={
								isAlreadyFollowed
									? "bg-neutral-300 text-black hover:bg-neutral-200"
									: ""
							}
						>
							{isAlreadyFollowed && <UserRoundCheck size={iconSize} />}
							<span>{isAlreadyFollowed ? "Followed" : "Follow"}</span>
						</Button>
					)}
				</AFallback>
			</XStack>
		</XStack>
	);
}
