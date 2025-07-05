import Link from "next/link";
import { H3, P } from "../ui/Heading";
import { YStack } from "../ui/Stack";
import IconsTray from "./IconsTray";
import ProfileRuler from "./ProfileRuler";
import { PoemWithAuthor } from "@/types/ComplexTypes";

type PoemProps = {
	poem: PoemWithAuthor;
};

export default function Poem({ poem }: PoemProps) {
	const { title, body, likeCount, commentCount, _id, author } = poem;

	return (
		<YStack className="w-full items-start py-4">
			<ProfileRuler author={author} />
			<Link href={`/poem/${_id}`}>
				<YStack className="items-start my-4">
					<H3>{title}</H3>
					<P>{body.substring(0, 42)}</P>
				</YStack>
			</Link>
			<IconsTray
				likeCount={likeCount}
				commentCount={commentCount}
				poemId={_id}
			/>
		</YStack>
	);
}
