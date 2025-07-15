import Image from "next/image";
import { H3, P } from "../ui/Heading";
import { YStack } from "../ui/Stack";

export default function About() {
	return (
		<YStack className="w-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 rounded-md my-12 p-4 [&>p]:w-full">
			<Image
				width={512}
				height={512}
				alt="about"
				src="/about-light.svg"
				className="block dark:hidden max-w-48 aspect-sqaure"
			/>
			<Image
				width={512}
				height={512}
				alt="about"
				src="/about-dark.svg"
				className="hidden dark:block max-w-48 aspect-sqaure"
			/>
			<H3 className="mb-2 mt-1">About</H3>
			<P>
				My name is Ashish, and I used to love Poetizer. I remember spending the
				entire summer of ’21 scribbling poems with shaky words and connecting
				with people there. Some of the best days of my life!
			</P>
			<P>
				You can still find me there as{" "}
				<a
					href="https://poetizer.com/author/175562"
					className="underline underline-offset-2"
				>
					AshishK
				</a>
				.
			</P>
			<P>
				But then, a few years ago, they introduced a subscription model, which
				essentially excluded everyone unwilling to pay. I totally understand the
				need for subscriptions — after all, you can’t offer a free lunch
				forever. However, the change practically shut us out.
			</P>
			<P>
				So I said to myself, why not create a new place for others to drop by
				and share those same old moments — and maybe even create some new ones
				too. Hence, I present to you — <b>Altar</b>.
			</P>
			<P>
				I will try to run this place for as long as I can, and I understand that
				I&apos;ll also need your support to keep the lights on. However, Altar
				is in its early days and simply needs your presence.
			</P>
			<P>- AshishK</P>
		</YStack>
	);
}
