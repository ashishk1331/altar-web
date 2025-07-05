import Poem from "../poem/Poem";
import { YStack } from "../ui/Stack";
import { PoemWithAuthor } from "@/types/ComplexTypes";

type FeedProps = {
	poems: PoemWithAuthor[];
};

export default function Feed({ poems = [] }: FeedProps) {
	return (
		<YStack className="w-full divide-y divide-neutral-200">
			{poems.map((poem) => (
				<Poem key={poem._id} poem={poem} />
			))}
		</YStack>
	);
}
