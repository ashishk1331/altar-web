import Poem from "../poem/Poem";
import { YStack } from "../ui/Stack";

export default function Feed() {
	return (
		<YStack className="w-full divide-y divide-neutral-200">
			{"abcdefghij".split("").map((char) => (
				<Poem key={char} />
			))}
		</YStack>
	);
}
