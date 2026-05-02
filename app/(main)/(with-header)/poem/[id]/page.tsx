import Front from "@/components/poem/Front";
import PoemInteractive from "@/components/poem/PoemInteractive";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type PoemPageProps = {
	params: Promise<{ id: Id<"poems"> }>;
};

export async function generateMetadata({
	params,
}: PoemPageProps): Promise<Metadata> {
	const { id } = await params;
	const poem = await fetchQuery(api.poems.readAPoem, { poemId: id });
	if (!poem) return { title: "Poem not found — Altar" };
	const authorName = poem.author
		? `${poem.author.firstName} ${poem.author.lastName}`
		: "Unknown";
	return {
		title: `${poem.title} — ${authorName} on Altar`,
		description: poem.body.slice(0, 160),
	};
}

export default async function PoemPage({ params }: PoemPageProps) {
	const { id: poemId } = await params;
	const poem = await fetchQuery(api.poems.readAPoem, { poemId });
	if (!poem) notFound();

	return (
		<>
			<Front poem={poem} />
			<PoemInteractive poemId={poemId} initialPoem={poem} />
		</>
	);
}
