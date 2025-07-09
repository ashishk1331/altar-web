"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Button from "../ui/Button";
import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";

type BackNavProps = {
	title?: string;
	rightExtra?: ReactNode;
	disableBack?: boolean;
};

export default function BackNav({
	title = "",
	rightExtra = null,
	disableBack = false,
}: BackNavProps) {
	const router = useRouter();

	return (
		<XStack className="sticky top-0 w-full bg-white py-2">
			<Button variant="icon" disabled={disableBack} onClick={router.back}>
				<ArrowLeft size={16} className="text-black" />
			</Button>
			{title && <P>{title}</P>}
			{rightExtra}
		</XStack>
	);
}
