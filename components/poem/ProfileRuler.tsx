import Link from "next/link";
import Avatar from "../blocks/Avatar";
import { P } from "../ui/Heading";
import { XStack, YStack } from "../ui/Stack";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { formatDistance } from "date-fns";
import {
	DropdownContent,
	DropdownTrigger,
	DropdownWrapper,
} from "../ui/Dropdown";
import { Ellipsis, PencilLine, Trash } from "lucide-react";
import Button from "../ui/Button";
import { iconSize } from "@/constants/tokens";
import { useAction } from "@/hooks/useAction";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { callToast } from "../ui/Toast";
import { useEditStore } from "@/store/editStore";
import { useRouter } from "next/navigation";

type ProfileRulerProps = {
	author: Doc<"users">;
	showSettings: boolean;
	poem: Doc<"poems">;
};

export default function ProfileRuler({
	author,
	showSettings,
	poem,
}: ProfileRulerProps) {
	const router = useRouter();
	const { picture, name, _creationTime } = author;
	const deletePoem = useMutation(api.poems.deletePoem);
	const { loading: isLoading, action: handleDelete } = useAction(
		async function () {
			await deletePoem({ poemId: poem._id });
			callToast.success("Deleted your work.");
		},
	);
	const setDraft = useEditStore(state => state.setDraft)

	function handleEdit() {
		setDraft(poem);
		router.push("/write");
	}

	return (
		<XStack className="w-full">
			<Avatar src={picture} alt="image of user" width={64} variant="md" />
			<Link href={`/author/${123}`}>
				<P>{name}</P>
			</Link>
			<P className="text-neutral-400">
				{formatDistance(_creationTime, new Date(), { addSuffix: true })}
			</P>
			{showSettings && (
				<XStack className="ml-auto">
					<DropdownWrapper>
						<DropdownTrigger>
							<Ellipsis size={16} className="text-black" />
						</DropdownTrigger>
						<DropdownContent>
							<YStack className="p-2 bg-white rounded shadow-md items-start *:w-full">
								<Button variant="outline" onClick={handleEdit}>
									<PencilLine size={iconSize - 4} />
									<P>Edit</P>
								</Button>
								<Button
									isLoading={isLoading}
									disabled={isLoading}
									onClick={handleDelete}
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
			)}
		</XStack>
	);
}
