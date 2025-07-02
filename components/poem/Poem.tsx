import Link from "next/link";
import { H3, P } from "../ui/Heading";
import { YStack } from "../ui/Stack";
import IconsTray from "./IconsTray";
import ProfileRuler from "./ProfileRuler";

export default function Poem() {
	return (
		<YStack className="w-full items-start py-4">
			<ProfileRuler />
			<Link href={`/poem/${123}`}>
				<YStack className="items-start my-4">
					<H3>Title to the poem</H3>
					<P>
						Marketing military-grade chrome digital knife free-market assault
						drugs drone lights vinyl semiotics
					</P>
				</YStack>
			</Link>
			<IconsTray />
		</YStack>
	);
}
