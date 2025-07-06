import { Doc } from "@/convex/_generated/dataModel";
import Avatar from "../blocks/Avatar";
import { P } from "../ui/Heading";
import { XStack, YStack } from "../ui/Stack";

type ProfileFrontProps = {
	author: Doc<"users">;
};

export default function ProfileFront({ author }: ProfileFrontProps) {
	const { picture, firstName, lastName, bio, followerCount, followingCount } =
		author;

	return (
		<XStack className="w-full gap-4 my-8 items-start">
			<Avatar src={picture} alt="image of user" variant="xl" className="mt-1" />
			<YStack className="w-full items-start gap-0">
				<P>
					{firstName} {lastName}
				</P>
				{bio && <P>{bio}</P>}
				<XStack className="w-full gap-8 mt-4">
					<P>{followerCount} followers</P>
					<P>{followingCount} following</P>
				</XStack>
			</YStack>
		</XStack>
	);
}
