import { YStack } from "../ui/Stack";

export default function FeedSkeleton() {
	return (
		<YStack className="w-full divide-y divide-neutral-200 animate-pulse">
			{"abcde".split("").map((char) => (
				<div key={char} className="w-full min-h-48 bg-neutral-200 rounded" />
			))}
		</YStack>
	);
}
