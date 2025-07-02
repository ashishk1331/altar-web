import { PencilLine } from "lucide-react";
import Link from "next/link";
import { iconSize } from "@/constants/tokens";
import Button from "../ui/Button";
import { P } from "../ui/Heading";

export default function WriteButton() {
	return (
		<Link href="/write">
			<Button className="fixed bottom-0 right-0 m-4 px-6 py-3">
				<PencilLine size={iconSize - 4} />
				<P>Write</P>
			</Button>
		</Link>
	);
}
