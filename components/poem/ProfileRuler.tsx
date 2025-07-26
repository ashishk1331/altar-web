import Link from "next/link";
import Avatar from "../blocks/Avatar";
import { P } from "../ui/Heading";
import { XStack, YStack } from "../ui/Stack";
import { formatDistance } from "date-fns";
import {
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
	DropdownWrapper,
} from "../ui/Dropdown";
import { Ellipsis, PencilLine, Trash } from "lucide-react";
import { iconSize } from "@/constants/tokens";
import { useAction } from "@/hooks/useAction";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { callToast } from "../ui/Toast";
import { useEditStore } from "@/store/editStore";
import { useRouter } from "next/navigation";
import { PoemWithAuthor } from "@/types/ComplexTypes";
import { useModal } from "../ui/Modal";
import DeleteModal from "../ui/DeleteModal";

type ProfileRulerProps = {
	showSettings: boolean;
	poem: PoemWithAuthor;
};

export default function ProfileRuler({
	showSettings,
	poem,
}: ProfileRulerProps) {
	const router = useRouter();
	const { openModal, closeModal } = useModal();
	const { author } = poem;
	const deletePoem = useMutation(api.poems.deletePoem);
	const { loading: isLoading, action: handleDelete } = useAction(
		async function () {
			await deletePoem({ poemId: poem._id });
			callToast.success("Deleted your work.");
			closeModal();
		},
	);
	const setDraft = useEditStore((state) => state.setDraft);

	function handleEdit() {
		setDraft(poem);
		router.push("/write");
	}

	return (
		<XStack className="w-full">
			<Avatar
				src={author?.picture ?? ""}
				alt="image of user"
				width={64}
				variant="md"
			/>
			<Link href={`/author/${author?._id}`}>
				<P>
					{author?.firstName ?? ""} {author?.lastName ?? ""}
				</P>
			</Link>
			<P className="text-neutral-400">
				{formatDistance(poem._creationTime, new Date(), { addSuffix: true })}
			</P>
			{showSettings && (
				<XStack className="ml-auto">
					<DropdownWrapper>
						<DropdownTrigger>
							<Ellipsis
								size={16}
								className="text-neutral-950 dark:text-neutral-100"
							/>
						</DropdownTrigger>
						<DropdownContent>
							<YStack className="p-2 bg-neutral-50 dark:bg-neutral-900 rounded shadow-xl items-start gap-0 *:w-full">
								<DropdownItem onClick={handleEdit}>
									<PencilLine size={iconSize} />
									<P>Edit</P>
								</DropdownItem>
								<DropdownItem
									className="text-red-500 hover:bg-red-50"
									onClick={() =>
										openModal(
											<DeleteModal
												isLoading={isLoading}
												closeModal={closeModal}
												deleteAction={handleDelete}
											/>,
										)
									}
								>
									<Trash size={iconSize} />
									<P>Delete</P>
								</DropdownItem>
							</YStack>
						</DropdownContent>
					</DropdownWrapper>
				</XStack>
			)}
		</XStack>
	);
}
