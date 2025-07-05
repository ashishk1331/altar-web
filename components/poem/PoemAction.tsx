import { YStack } from "../ui/Stack";
import IconsTray from "./IconsTray";
import ProfileRuler from "./ProfileRuler";
import { PoemWithAuthor } from "@/types/ComplexTypes";

type PoemActionProps = {
	poem: PoemWithAuthor;
};

export default function PoemAction({ poem }: PoemActionProps) {
	const { author, likeCount, commentCount, _id: poemId } = poem;

	return (
		<YStack className="py-8 gap-4 border-y border-neutral-300">
			<ProfileRuler author={author} />
			<IconsTray
				likeCount={likeCount}
				commentCount={commentCount}
				poemId={poemId}
			/>
		</YStack>
	);
}
