import { Send } from "lucide-react";
import Avatar from "@/components/blocks/Avatar";
import Button from "@/components/ui/Button";
import { XStack } from "@/components/ui/Stack";
import Textarea from "@/components/ui/Textarea";
import { iconSize } from "@/constants/tokens";
import { useAction } from "@/hooks/useAction";
import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { callToast } from "@/components/ui/Toast";
import { useUserContext } from "@/components/blocks/AFallback";

type CommentFormProps = {
	poem: Doc<"poems">;
};

export default function CommentForm({ poem }: CommentFormProps) {
	const { user: author } = useUserContext();
	const [body, setBody] = useState("");
	const writeComment = useMutation(api.comments.writeComment);
	const { picture, _id: authorId, name } = author;
	const { _id: poemId } = poem;

	const { loading: isLoading, action: handleSubmit } = useAction(
		async function () {
			if (!body) {
				throw new Error("Write few words before.");
			}
			const ID = await writeComment({ authorId, poemId, body });
			if (!ID) throw new Error("Unable to create the poem.");
			callToast.success("Comment published.");
			setBody("");
		},
	);

	return (
		<XStack className="mt-4">
			<Avatar src={picture} alt={`Avatar of ${name}`} width={64} variant="lg" />
			<Textarea
				value={body}
				onChange={(e) => setBody(e.target.value)}
				className="w-full"
				placeholder="comment here..."
			/>
			<Button
				variant="icon"
				isLoading={isLoading}
				disabled={isLoading}
				onClick={handleSubmit}
			>
				<Send size={iconSize - 4} className="text-black" />
			</Button>
		</XStack>
	);
}
