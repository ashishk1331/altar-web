import { AlertCircle } from "lucide-react";
import { XStack, YStack } from "./Stack";
import { iconSize } from "@/constants/tokens";
import { type ModalContextType } from "./Modal";
import Button from "./Button";

type DeleteModalProps = {
	message?: string;
	closeModal: ModalContextType["closeModal"];
	deleteAction: () => void;
	isLoading: boolean;
};

export default function DeleteModal({
	message = "Are you sure you want to delete!",
	closeModal,
	deleteAction,
	isLoading = true,
}: DeleteModalProps) {
	return (
		<YStack className="min-w-xs py-8 px-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-lg shadow-md">
			<AlertCircle size={iconSize * 2} className="text-red-500 mb-4" />
			<p className="mb-8 text-center">{message}</p>
			<XStack className="w-full *:w-full *:justify-around">
				<Button variant="outline" onClick={closeModal}>
					Cancel
				</Button>
				<Button
					disabled={isLoading}
					isLoading={isLoading}
					onClick={deleteAction}
				>
					Delete
				</Button>
			</XStack>
		</YStack>
	);
}
