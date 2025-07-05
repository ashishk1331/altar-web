import Image from "next/image";
import { H1, H3, P } from "../ui/Heading";
import { LogIn } from "lucide-react";
import { iconSize } from "@/constants/tokens";
import { YStack } from "../ui/Stack";
import Button from "../ui/Button";
import Link from "next/link";

export default function Hero() {
	return (
		<YStack>
			<YStack className="my-12 justify-center">
				<H1>Join the safe place</H1>
				<H3>for your writing rituals.</H3>
				<Link href="/signin">
					<Button className="mt-4">
						<LogIn size={iconSize - 4} />
						<P>Login</P>
					</Button>
				</Link>
			</YStack>
			<Image
				src="/people.webp"
				width={1024}
				height={720}
				alt="Banner image."
				className="scale-110 md:scale-none"
				priority
			/>
		</YStack>
	);
}
