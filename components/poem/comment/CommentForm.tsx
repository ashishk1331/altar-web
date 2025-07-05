import { Send } from "lucide-react";
import Avatar from "@/components/blocks/Avatar";
import Button from "@/components/ui/Button";
import { XStack } from "@/components/ui/Stack";
import Textarea from "@/components/ui/Textarea";
import { iconSize } from "@/constants/tokens";
import { useUserStore } from "@/store/userStore";

export default function CommentForm() {
	const user = useUserStore(state => state.user);

	if (!user) return null;

	const { picture } = user;

	return (
		<XStack className="mt-4">
			<Avatar
				src={picture}
				alt="image of user"
				width={64}
				variant="lg"
			/>
			<Textarea className="w-full" placeholder="comment here..." />
			<Button variant="icon">
				<Send size={iconSize - 4} className="text-black" />
			</Button>
		</XStack>
	);
}
