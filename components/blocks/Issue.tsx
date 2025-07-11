import { Doc } from "@/convex/_generated/dataModel";
import { XStack, YStack } from "../ui/Stack";
import { CircleCheck, ClockFading, Dot } from "lucide-react";
import { iconSize } from "@/constants/tokens";
import { Caption, P } from "../ui/Heading";
import { twJoin } from "tailwind-merge";
import { format, formatDistance } from "date-fns";

type IssueProps = {
	issue: Doc<"issues">;
};

export default function Issue({ issue }: IssueProps) {
	const { status, issue: body, _creationTime } = issue;

	return (
		<YStack
			className={twJoin(
				"w-full items-start p-2 px-4 border rounded",
				status === "in_review"
					? "bg-orange-100 border-orange-200"
					: "bg-green-100 border-green-200",
			)}
		>
			<XStack
				className={twJoin(
					"w-full justify-between",
					status === "in_review" ? "text-orange-500" : "text-orange-500",
				)}
			>
				{status === "in_review" ? (
					<XStack>
						<ClockFading size={iconSize - 4} />
						<Caption>In Review</Caption>
					</XStack>
				) : (
					<XStack>
						<CircleCheck size={iconSize - 4} />
						<Caption>Solved</Caption>
					</XStack>
				)}
				<XStack>
					<Caption>{format(_creationTime, "dd/MM/yyyy")}</Caption>
					<Dot size={iconSize} />
					<Caption>
						{formatDistance(_creationTime, Date.now(), { addSuffix: true })}
					</Caption>
				</XStack>
			</XStack>
			<P>{body}</P>
		</YStack>
	);
}
