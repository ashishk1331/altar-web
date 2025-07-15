import { H3, P } from "../ui/Heading";
import { YStack } from "../ui/Stack";
import Image from "next/image";

const features = [
	{
		label: "Explore",
		summary:
			"Discover a world of heartfelt poems from voices around the globe. Read by mood, theme, or curiosity — there's something for every soul.",
		darkImage: "/explore-dark.svg",
		lightImage: "/explore-light.svg",
	},
	{
		label: "Connect",
		summary:
			"Follow your favorite poets, leave kind words, and build meaningful connections through verse. Poetry brings people closer here.",
		darkImage: "/network-dark.svg",
		lightImage: "/network-light.svg",
	},
	{
		label: "Safe Space",
		summary:
			"Share your words freely in a space that honors vulnerability and expression. Whether you're healing or celebrating, your voice matters.",
		darkImage: "/write-dark.svg",
		lightImage: "/write-light.svg",
	},
];

type FeatureType = (typeof features)[number];

export default function Features() {
	return (
		<YStack className="my-12 gap-4">
			{features.map((feature) => (
				<SingleFeature key={feature.label} feature={feature} />
			))}
		</YStack>
	);
}

type SingleFeatureProps = {
	feature: FeatureType;
};

function SingleFeature({ feature }: SingleFeatureProps) {
	const { label, summary, lightImage, darkImage } = feature;
	return (
		<div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 items-center">
			<Image
				width={512}
				height={512}
				alt="about"
				src={lightImage}
				className="block dark:hidden w-full object-cover md:col-start-2 max-w-48 aspect-sqaure"
			/>
			<Image
				width={512}
				height={512}
				alt="about"
				src={darkImage}
				className="hidden dark:block w-full object-cover md:col-start-2 max-w-48 aspect-sqaure"
			/>
			<YStack className="w-full items-start">
				<H3>{label}</H3>
				<P>{summary}</P>
			</YStack>
		</div>
	);
}
