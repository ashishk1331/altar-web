import Link from "next/link";
import Avatar from "../blocks/Avatar";
import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";

export default function ProfileRuler() {
	return (
		<XStack className="w-full">
			<Avatar
				src="https://picsum.photos/100"
				alt="image of user"
				width={64}
				variant="md"
			/>
			<Link href={`/author/${123}`}>
				<P>Boring Mule</P>
			</Link>
			<P className="text-neutral-400">4m ago</P>
		</XStack>
	);
}
