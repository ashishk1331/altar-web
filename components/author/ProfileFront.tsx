import Avatar from "../blocks/Avatar";
import { P } from "../ui/Heading";
import { XStack, YStack } from "../ui/Stack";

type ProfileFrontProps = {
	avatarURL: string;
	firstName: string;
	lastName: string;
	bio: string;
};

export default function ProfileFront({
	avatarURL,
	firstName,
	lastName,
	bio,
}: ProfileFrontProps) {
	return (
		<XStack className="w-full gap-4 my-8 items-start">
			<Avatar
				src={avatarURL}
				alt="image of user"
				variant="xl"
				className="mt-1"
			/>
			<YStack className="w-full items-start gap-0">
				<P>
					{firstName} {lastName}
				</P>
				{bio && <P>{bio}</P>}
				<XStack className="w-full gap-8 mt-4">
					<P>130 followers</P>
					<P>34 following</P>
				</XStack>
			</YStack>
		</XStack>
	);
}
