"use client";

import { ArrowLeft, Bell, Search, UserRound } from "lucide-react";
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
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
	const router = useRouter();
	const pathname = usePathname();
	const isAtHome = pathname.split("/")[1] === "home";

	return (
		<header className="sticky top-0 flex items-center gap-4 w-full justify-between py-4 bg-white">
			<XStack>
				{!isAtHome && (
					<Button variant="icon" onClick={router.back}>
						<ArrowLeft size={iconSize} />
					</Button>
				)}
				<Link href="/home">
					<H3>Altar</H3>
				</Link>
			</XStack>
			<AFallback fallback={<div />}>
				<XStack>
					<Link href="/notifications">
						<Button variant="icon">
							<Bell size={iconSize} className="text-black" />
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
