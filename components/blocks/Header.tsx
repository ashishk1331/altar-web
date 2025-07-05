"use client";

import { Bell, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/constants/NavItems";
import { iconSize } from "@/constants/tokens";
import Button from "../ui/Button";
import {
	DropdownContent,
	DropdownTrigger,
	DropdownWrapper,
} from "../ui/Dropdown";
import { H3, P } from "../ui/Heading";
import { XStack, YStack } from "../ui/Stack";
import Avatar from "./Avatar";
import { useUserStore } from "@/store/userStore";
import AFallback from "./AFallback";

export default function Header() {
	return (
		<header className="sticky top-0 flex items-center gap-4 w-full justify-between py-4 bg-white">
			<Link href="/home">
				<H3>Altar</H3>
			</Link>
			<AFallback fallback={<div />}>
				<XStack>
					<Link href="/notifications">
						<Button variant="icon">
							<Bell size={16} className="text-black" />
						</Button>
					</Link>
					<Link href="/search">
						<Button variant="icon">
							<Search size={16} className="text-black" />
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
					<Link href={`/author/${user?._id || ""}`} className="w-full">
						<Button variant="outline" className="w-full hover:bg-neutral-50">
							<UserRound size={iconSize - 4} />
							<P>Profile</P>
						</Button>
					</Link>
					{navItems.slice(1).map(({ label, Icon, href }) => (
						<Link key={href} href={href} className="w-full">
							<Button variant="outline" className="w-full hover:bg-neutral-50">
								<Icon size={iconSize - 4} />
								<P>{label}</P>
							</Button>
						</Link>
					))}
				</YStack>
			</DropdownContent>
		</DropdownWrapper>
	);
}
