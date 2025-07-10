import { FolderOpen } from "lucide-react";
import { P } from "../ui/Heading";
import { YStack } from "../ui/Stack";
import { iconSize } from "@/constants/tokens";

type EmptyFeedProps = {
	message?: string;
};

export default function EmptyFeed({ message = "" }: EmptyFeedProps) {
	return (
		<YStack className="p-8 my-8">
			<YStack className="text-neutral-400">
				<FolderOpen size={iconSize} />
				<P>{message || "Nothing to show."}</P>
			</YStack>
		</YStack>
	);
}
