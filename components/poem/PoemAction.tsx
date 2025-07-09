import { YStack } from "../ui/Stack";
import IconsTray from "./IconsTray";
import ProfileRuler from "./ProfileRuler";
import { PoemWithAuthor } from "@/types/ComplexTypes";
import AFallback from "../blocks/AFallback";

type PoemActionProps = {
	poem: PoemWithAuthor;
};

export default function PoemAction({ poem }: PoemActionProps) {
	return (
		<YStack className="py-8 gap-4 border-y border-neutral-300">
			<ProfileRuler showSettings={false} poem={poem} />
			<AFallback>
				<IconsTray poem={poem} />
			</AFallback>
		</YStack>
	);
}
