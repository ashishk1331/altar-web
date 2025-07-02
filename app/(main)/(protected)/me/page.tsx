"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import ProfileFront from "@/components/author/ProfileFront";
import BackNav from "@/components/blocks/BackNav";
import Button from "@/components/ui/Button";
import { P } from "@/components/ui/Heading";
import { XStack, YStack } from "@/components/ui/Stack";
import { navItems } from "@/constants/NavItems";
import { iconSize } from "@/constants/tokens";
import { useUserStore } from "@/store/userStore";
import { useShallow } from "zustand/shallow";
import { callToast } from "@/components/ui/Toast";

export default function Profile() {
	const [user, resetUser] = useUserStore(
		useShallow((state) => [state.user, state.resetUser]),
	);

	function handleLogout() {
		callToast.bye();
		resetUser();
	}

	return (
		<>
			<BackNav title="Profile" />
			<ProfileFront
				avatarURL={user?.picture || ""}
				firstName={user?.given_name || ""}
				lastName={user?.family_name || ""}
			/>
			<YStack className="items-start gap-2 my-4 *:p-2">
				{navItems.slice(0, -1).map(({ label, href, Icon }) => (
					<Link
						key={href}
						href={href}
						className="w-full hover:bg-neutral-50 rounded"
					>
						<XStack>
							<Icon size={iconSize - 4} />
							<P>{label}</P>
						</XStack>
					</Link>
				))}
				<Button
					variant="outline"
					className="w-full p-0 text-red-500 hover:bg-red-50"
					onClick={handleLogout}
				>
					<LogOut size={iconSize - 4} />
					<P>Log Out</P>
				</Button>
			</YStack>
		</>
	);
}
