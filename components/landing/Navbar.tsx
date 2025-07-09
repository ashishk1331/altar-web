import { H3 } from "../ui/Heading";
import { XStack } from "../ui/Stack";

export default function Navbar() {
	return (
		<nav>
			<XStack className="w-full items-start py-4">
				<H3>Altar</H3>
			</XStack>
		</nav>
	);
}
