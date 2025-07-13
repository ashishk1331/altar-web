"use client";

import { Bell, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/constants/NavItems";
import { iconSize } from "@/constants/tokens";
import Button from "../ui/Button";
import {
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
	DropdownWrapper,
} from "../ui/Dropdown";
import { H3, P } from "../ui/Heading";
import { XStack, YStack } from "../ui/Stack";
import Avatar from "./Avatar";
import { useUserStore } from "@/store/userStore";
import AFallback from "./AFallback";
import { useRouter } from "next/navigation";

export default function Header() {
	return (
		<header className="sticky top-0 flex items-center gap-4 w-full justify-between py-4 bg-white">
			<Link href="/home">
				<H3>Altar</H3>
			</Link>
			<AFallback fallback={<div />}>
				<XStack>
					<Link href="/notifications">
						<Button variant="icon" className="relative">
							<Bell size={iconSize} className="text-black" />
							<div className="absolute top-0 right-0 -translate-x-full translate-y-full w-2 h-2 aspect-sqaure rounded-full bg-red-500" />
						</Button>
					</Link>
					<Link href="/search">
						<Button variant="icon">
							<Search size={iconSize} className="text-black" />
						</Button>
					</Link>
					<AvatarWithDropdown />
				</XStack>
			</AFallback>
		</header>
	);
}

function AvatarWithDropdown() {
	const user = useUserStore((state) => state.user);
	const router = useRouter();

	return (
		<DropdownWrapper>
			<DropdownTrigger>
				<Avatar
					src={user?.picture || ""}
					alt="image of user"
					width={64}
					variant="md"
				/>
			</DropdownTrigger>
			<DropdownContent>
				<YStack className="p-2 bg-white rounded shadow-xl items-start gap-0 *:w-full">
					<DropdownItem
						onClick={() => router.push(`/author/${user?._id || ""}`)}
						className="w-full hover:bg-neutral-50"
					>
						<UserRound size={iconSize} />
						<P>Profile</P>
					</DropdownItem>
					{navItems.slice(1).map(({ label, Icon, href }) => (
						<DropdownItem key={href} onClick={() => router.push(href)}>
							<Icon size={iconSize} />
							<P>{label}</P>
						</DropdownItem>
					))}
				</YStack>
			</DropdownContent>
		</DropdownWrapper>
	);
}
