import { H3 } from "@/components/ui/Heading";
import { YStack } from "@/components/ui/Stack";
import Comment from "./Comment";

export default function Forum() {
	return (
		<YStack className="gap-8 my-12 items-start">
			<H3>Comments</H3>
			<Comment />
			<Comment />
			<Comment />
			<Comment />
		</YStack>
	);
}
