import { YStack } from "../ui/Stack";
import IconsTray from "./IconsTray";
import ProfileRuler from "./ProfileRuler";

export default function PoemAction() {
	return (
		<YStack className="py-8 gap-4 border-y border-neutral-300">
			<ProfileRuler />
			<IconsTray />
		</YStack>
	);
}
