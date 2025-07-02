import { LogIn } from "lucide-react";
import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";
import { iconSize } from "@/constants/tokens";
import Button from "../ui/Button";
import Link from "next/link";

export default function SigninBanner() {
	return (
		<XStack className="fixed bottom-0 left-0 right-0 w-full p-4 md:px-8 justify-between bg-indigo-500 text-white">
			<P>Login to comment and share your thoughts!</P>
			<Link href="/signin">
				<Button
					variant="outline"
					className="text-white bg-indigo-400 hover:bg-indigo-400/80"
				>
					<LogIn size={iconSize - 4} />
					<P>Login</P>
				</Button>
			</Link>
		</XStack>
	);
}
