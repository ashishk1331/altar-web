"use client";

import { LogOut, OctagonAlert, UserRound } from "lucide-react";
import ProfileFront from "@/components/author/ProfileFront";
import BackNav from "@/components/blocks/BackNav";
import Button from "@/components/ui/Button";
import { P } from "@/components/ui/Heading";
import { YStack } from "@/components/ui/Stack";
import { navItems } from "@/constants/NavItems";
import { iconSize } from "@/constants/tokens";
import { useUserStore } from "@/store/userStore";
import { useShallow } from "zustand/shallow";
import { callToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import HR from "@/components/ui/HR";

export default function Profile() {
	const router = useRouter();
	const [user, resetUser] = useUserStore(
		useShallow((state) => [state.user, state.resetUser]),
	);

	function handleLogout() {
		callToast.bye();
		resetUser();
	}

	if (!user) return null;

	return (
		<>
			<BackNav title="Profile" />
			<ProfileFront author={user} />
			<HR />
			<YStack className="items-start gap-2 my-4 *:p-2 *:w-full">
				<Button
					onClick={() => router.push(`/author/${user._id}`)}
					variant="outline"
					className="hover:bg-neutral-50 rounded"
				>
					<UserRound size={iconSize} />
					<P>Profile</P>
				</Button>
				{navItems.slice(0, -1).map(({ label, href, Icon }) => (
					<Button
						key={href}
						onClick={() => router.push(href)}
						variant="outline"
					>
						<Icon size={iconSize} />
						<P>{label}</P>
					</Button>
				))}
				<Button
					onClick={() => router.push("/report-issue")}
					variant="outline"
					className="text-red-500 hover:bg-red-50"
				>
					<OctagonAlert size={iconSize} />
					<P>Report Issue</P>
				</Button>
				<Button
					variant="outline"
					className="text-red-500 hover:bg-red-50"
					onClick={handleLogout}
				>
					<LogOut size={iconSize} />
					<P>Log Out</P>
				</Button>
			</YStack>
		</>
	);
}
