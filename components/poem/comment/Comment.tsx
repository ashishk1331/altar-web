import { CircleCheck, Ellipsis, Trash } from "lucide-react";
import Link from "next/link";
import Avatar from "@/components/blocks/Avatar";
import Button from "@/components/ui/Button";
import {
	DropdownContent,
	DropdownTrigger,
	DropdownWrapper,
} from "@/components/ui/Dropdown";
import { P } from "@/components/ui/Heading";
import { XStack, YStack } from "@/components/ui/Stack";
import { iconSize } from "@/constants/tokens";
import AFallback from "@/components/blocks/AFallback";

type CommentProps = {
	isAuthor?: boolean;
};

export default function Comment({ isAuthor = false }: CommentProps) {
	return (
		<XStack className="w-full gap-4 items-start">
			<Avatar
				src="https://picsum.photos/100"
				alt="image of user"
				width={64}
				variant="md"
			/>
			<YStack className="w-full">
				<XStack className="w-full">
					<Link href={`/author/${123}`}>
						<P>Boring Mule</P>
					</Link>
					{isAuthor && (
						<CircleCheck size={iconSize - 4} className="text-black" />
					)}
					<P className="text-neutral-400">4m ago</P>
					<AFallback>
						<XStack className="ml-auto">
							<DropdownWrapper>
								<DropdownTrigger>
									<Button variant="outline">
										<Ellipsis size={16} className="text-black" />
									</Button>
								</DropdownTrigger>
								<DropdownContent>
									<YStack className="p-2 bg-white rounded shadow-md mr-2">
										<Button
											variant="outline"
											className="text-red-500 hover:bg-red-50"
										>
											<Trash size={iconSize - 4} />
											<P>Delete</P>
										</Button>
									</YStack>
								</DropdownContent>
							</DropdownWrapper>
						</XStack>
					</AFallback>
				</XStack>
				<P>
					Cardboard DIY savant semiotics plastic disposable otaku rebar. Knife
					3D-printed alcohol military-grade singularity refrigerator car
					cardboard grenade dead.
				</P>
			</YStack>
		</XStack>
	);
}
