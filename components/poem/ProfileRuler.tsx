import Link from "next/link";
import Avatar from "../blocks/Avatar";
import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";
import { Doc } from "@/convex/_generated/dataModel";
import { formatDistance } from "date-fns";

type ProfileRulerProps = {
	author: Doc<"users">;
};

export default function ProfileRuler({ author }: ProfileRulerProps) {
	const { picture, name, _creationTime } = author;
	return (
		<XStack className="w-full">
			<Avatar src={picture} alt="image of user" width={64} variant="md" />
			<Link href={`/author/${123}`}>
				<P>{name}</P>
			</Link>
			<P className="text-neutral-400">
				{formatDistance(_creationTime, new Date(), { addSuffix: true })}
			</P>
		</XStack>
	);
}
