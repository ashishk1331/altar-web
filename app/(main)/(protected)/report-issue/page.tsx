"use client";

import { useUserContext } from "@/components/blocks/AFallback";
import BackNav from "@/components/blocks/BackNav";
import Button from "@/components/ui/Button";
import { P } from "@/components/ui/Heading";
import HR from "@/components/ui/HR";
import { XStack, YStack } from "@/components/ui/Stack";
import Textarea from "@/components/ui/Textarea";
import { callToast } from "@/components/ui/Toast";
import { iconSize } from "@/constants/tokens";
import { api } from "@/convex/_generated/api";
import { useAction } from "@/hooks/useAction";
import { useMutation } from "convex/react";
import { Dot, Files } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReportIssuePage() {
	const router = useRouter();
	const { user } = useUserContext();
	const points = [
		"Include as many details as you can.",
		"Don't include any personal information.",
		"Only report UI-related issues, such as a button not working.",
	];
	const [issue, setIssue] = useState("");

	const writeIssue = useMutation(api.issues.writeIssue);
	const { loading: isLoading, action: handleSubmit } = useAction(
		async function () {
			if (!issue) {
				callToast.error("");
				return;
			}

			const ID = await writeIssue({ issue, authorId: user._id });
			if (!ID) {
				callToast.error("Error reporting the issue.");
				return;
			}
			callToast.success("Issue reported.");
			setIssue("");
		},
	);
	return (
		<>
			<BackNav
				title="Report Issue"
				rightExtra={
					<XStack className="ml-auto gap-4">
						<Button
							variant="outline"
							onClick={() => router.push("/report-issue/issues")}
						>
							<Files size={iconSize} />
							<P>All Issues</P>
						</Button>
						<Button
							isLoading={isLoading}
							disabled={isLoading}
							onClick={handleSubmit}
						>
							Send
						</Button>
					</XStack>
				}
			/>
			<YStack className="items-start my-4">
				<P>Points to remember:</P>
				{points.map((point) => (
					<XStack key={point}>
						<Dot size={iconSize + 4} className="text-indigo-500" />
						<P>{point}</P>
					</XStack>
				))}
			</YStack>
			<HR className="mb-4" />
			<Textarea
				value={issue}
				disabled={isLoading}
				onChange={(e) => setIssue(e.target.value)}
				placeholder="Write about the issue here..."
				label="Issue"
			/>
		</>
	);
}
