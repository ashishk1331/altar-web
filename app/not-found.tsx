import Header from "@/components/blocks/Header";
import Button from "@/components/ui/Button";
import { H3 } from "@/components/ui/Heading";
import { YStack } from "@/components/ui/Stack";
import Image from "next/image";

export default function NotFound() {
	return (
		<>
			<Header />
			<YStack className="h-full justify-around w-full mt-24">
				<Image
					width={512}
					height={512}
					alt="about"
					src="/404-light.svg"
					className="block dark:hidden"
				/>
				<Image
					width={512}
					height={512}
					alt="about"
					src="/404-dark.svg"
					className="hidden dark:block"
				/>
				<H3 className="mt-4">Not Found</H3>
				<p>Could not find requested resource</p>
				<a href="/home" className="mt-4">
					<Button>Return Home</Button>
				</a>
			</YStack>
		</>
	);
}
