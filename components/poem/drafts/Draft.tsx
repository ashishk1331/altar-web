import { H3, P } from "@/components/ui/Heading";
import { YStack } from "@/components/ui/Stack";
import { PoemWithAuthor } from "@/types/ComplexTypes";
import ProfileRuler from "../ProfileRuler";
import { useEditStore } from "@/store/editStore";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

type PoemProps = {
	poem: Omit<PoemWithAuthor, "isBookmarked" | "isLiked">;
};

export default function Draft({ poem }: PoemProps) {
	const router = useRouter();
	const { title, body } = poem;
	const setDraft = useEditStore((state) => state.setDraft);

	function handleDraft() {
		setDraft(poem);
		router.push("/write");
	}

	return (
		<YStack className="w-full items-start py-4">
			<ProfileRuler showSettings poem={poem} />
			<Button
				variant="outline"
				className="w-full hover:bg-white items-start"
				onClick={handleDraft}
			>
				<YStack className="items-start text-left my-4">
					<H3>{title}</H3>
					<P>{body.substring(0, 42)}</P>
				</YStack>
			</Button>
		</YStack>
	);
}
