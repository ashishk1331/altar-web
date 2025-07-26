"use client";

import Header from "@/components/blocks/Header";
import Button from "@/components/ui/Button";
import { H3 } from "@/components/ui/Heading";
import { YStack } from "@/components/ui/Stack";
import Image from "next/image";

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<>
			<Header />
			<YStack className="h-full justify-around w-full mt-24">
				<Image
					width={512}
					height={512}
					alt="about"
					src="/404-light.svg"
					className="block dark:hidden max-w-48 aspect-sqaure"
				/>
				<Image
					width={512}
					height={512}
					alt="about"
					src="/404-dark.svg"
					className="hidden dark:block max-w-48 aspect-sqaure"
				/>
				<H3 className="mt-4">Error Occured</H3>
				<p>{error.message}</p>
				<a href="/home" className="mt-4">
					<Button>Return Home</Button>
				</a>
			</YStack>
		</>
	);
}
