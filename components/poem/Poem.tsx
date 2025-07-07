import Link from "next/link";
import { H3, P } from "../ui/Heading";
import { YStack } from "../ui/Stack";
import IconsTray from "./IconsTray";
import ProfileRuler from "./ProfileRuler";
import { PoemWithAuthor } from "@/types/ComplexTypes";
import AFallback from "../blocks/AFallback";

type PoemProps = {
	poem: PoemWithAuthor;
	showSettings: boolean;
};

export default function Poem({ poem, showSettings }: PoemProps) {
	const { title, body, _id: poemId, author } = poem;

	return (
		<YStack className="w-full items-start py-4">
			{author && (
				<ProfileRuler
					author={author}
					showSettings={showSettings}
					poem={poem}
				/>
			)}
			<Link href={`/poem/${poemId}`}>
				<YStack className="items-start my-4">
					<H3>{title}</H3>
					<P>{body.substring(0, 42)}</P>
				</YStack>
			</Link>
			<AFallback>
				<IconsTray poem={poem} />
			</AFallback>
		</YStack>
	);
}
