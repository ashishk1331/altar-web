import AuthorFeed from "@/components/author/AuthorFeed";
import AuthorProfile from "@/components/author/AuthorProfile";
import HR from "@/components/ui/HR";
import { Id } from "@/convex/_generated/dataModel";

type AuthorPageProps = {
	params: Promise<{ id: Id<"users"> }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
	const { id } = await params;

	return (
		<>
			<AuthorProfile authorId={id} />
			<HR />
			<AuthorFeed authorId={id} />
		</>
	);
}
