import { H3 } from "../ui/Heading";
import { XStack } from "../ui/Stack";

export default function Navbar() {
	return (
		<nav>
			<XStack className="w-full justify-around py-4">
				<H3>Altar</H3>
			</XStack>
		</nav>
	);
}
