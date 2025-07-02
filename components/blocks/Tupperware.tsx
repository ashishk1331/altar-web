import type { PropsWithChildren } from "react";
import { YStack } from "../ui/Stack";

export default function Tupperware({ children }: PropsWithChildren) {
	return (
		<YStack className="relative w-full h-full items-start *:w-full">
			{children}
		</YStack>
	);
}
