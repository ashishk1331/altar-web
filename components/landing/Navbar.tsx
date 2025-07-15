import { H3 } from "../ui/Heading";
import { XStack } from "../ui/Stack";

export default function Navbar() {
	return (
		<nav className="sticky top-0 bg-neutral-50 dark:bg-neutral-950">
			<XStack className="w-full items-start py-4">
				<H3>Altar</H3>
			</XStack>
		</nav>
	);
}
