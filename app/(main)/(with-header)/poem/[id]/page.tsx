import AFallback from "@/components/blocks/AFallback";
import CommentForm from "@/components/poem/comment/CommentForm";
import Forum from "@/components/poem/comment/Forum";
import Front from "@/components/poem/Front";
import PoemAction from "@/components/poem/PoemAction";

export default function PoemPage() {
	return (
		<>
			<Front />
			<PoemAction />
			<AFallback>
				<CommentForm />
			</AFallback>
			<Forum />
		</>
	);
}
