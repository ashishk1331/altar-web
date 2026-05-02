import AuthorFeed from "@/components/author/AuthorFeed";
import AuthorProfile from "@/components/author/AuthorProfile";
import HR from "@/components/ui/HR";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type AuthorPageProps = {
	params: Promise<{ id: Id<"users"> }>;
};

async function safeReadAuthor(authorId: Id<"users">) {
	try {
		return await fetchQuery(api.users.readUser, { authorId });
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params,
}: AuthorPageProps): Promise<Metadata> {
	const { id } = await params;
	const author = await safeReadAuthor(id);
	if (!author) return { title: "Author not found — Altar" };
	const fullName = `${author.firstName} ${author.lastName}`;
	return {
		title: `${fullName} — Altar`,
		description: author.bio?.length
			? author.bio
			: `Poems by ${fullName} on Altar.`,
	};
}

export default async function AuthorPage({ params }: AuthorPageProps) {
	const { id } = await params;
	const author = await safeReadAuthor(id);
	if (!author) notFound();

	return (
		<>
			<AuthorProfile authorId={id} initialAuthor={author} />
			<HR />
			<AuthorFeed authorId={id} />
		</>
	);
}
