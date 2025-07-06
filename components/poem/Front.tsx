import { H3, P } from "../ui/Heading";
import { YStack } from "../ui/Stack";
import { PoemWithAuthor } from "@/types/ComplexTypes";

type FrontProps = {
	poem: PoemWithAuthor;
};

export default function Front({ poem }: FrontProps) {
	const { title, body } = poem;
	const lines = body.split("\n");

	return (
		<YStack className="items-start my-8 gap-8">
			<H3>{title}</H3>
			<YStack className="w-full items-start gap-1">
				{lines.map((line) => (
					<P key={line}>{line}</P>
				))}
			</YStack>
		</YStack>
	);
}
