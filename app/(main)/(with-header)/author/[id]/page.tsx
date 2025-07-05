import AuthorFeed from "@/components/author/AuthorFeed";
import AuthorProfile from "@/components/author/AuthorProfile";
import Meta from "@/components/author/Meta";
import AFallback from "@/components/blocks/AFallback";
import { Id } from "@/convex/_generated/dataModel";

type AuthorPageProps = {
	params: Promise<{ id: Id<"users"> }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
	const { id } = await params;

	return (
		<>
			<AuthorProfile authorId={id} />
			<AFallback>
				<Meta />
			</AFallback>
			<hr className="text-neutral-200" />
			<AuthorFeed authorId={id} />
		</>
	);
}
