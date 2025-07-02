"use client";

import { UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { iconSize } from "@/constants/tokens";
import Button from "../ui/Button";
import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";

export default function Meta() {
	const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false);

	return (
		<XStack className="justify-between my-4">
			<P>
				Posts <b>24</b>
			</P>
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
		</XStack>
	);
}
