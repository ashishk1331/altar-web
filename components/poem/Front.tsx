import { H3, P } from "../ui/Heading";
import { YStack } from "../ui/Stack";
import { PoemWithAuthor } from "@/types/ComplexTypes";

type FrontProps = {
	poem: PoemWithAuthor;
};

export default function Front({ poem }: FrontProps) {
	const { title, body } = poem;
	return (
		<YStack className="items-start my-8 gap-8">
			<H3>{title}</H3>
			<P>{body}</P>
		</YStack>
	);
}
