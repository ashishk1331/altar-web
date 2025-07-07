import { YStack } from "@/components/ui/Stack";
import { PoemWithAuthor } from "@/types/ComplexTypes";
import Draft from "./Draft";

type DraftsFeedProps = {
	poems: Omit<PoemWithAuthor, "isBookmarked" | "isLiked">[];
};

export default function DraftsFeed({ poems }: DraftsFeedProps) {
	return (
		<YStack className="w-full divide-y divide-neutral-200">
			{poems.map((poem) => (
				<Draft key={poem._id} poem={poem} />
			))}
		</YStack>
	);
}
