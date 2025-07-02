"use client";

import BackNav from "@/components/blocks/BackNav";
import Button from "@/components/ui/Button";
import HR from "@/components/ui/HR";
import Textarea from "@/components/ui/Textarea";

export default function Write() {
	return (
		<>
			<BackNav
				title="Write"
				rightExtra={<Button className="ml-auto">Publish</Button>}
			/>
			<Textarea placeholder="title here" className="bg-white mt-4" />
			<HR />
			<Textarea placeholder="jot your thoughts here" className="bg-white" />
		</>
	);
}
