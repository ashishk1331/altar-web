import { Search } from "lucide-react";
import BackNav from "@/components/blocks/BackNav";
import Feed from "@/components/home/Feed";
import FiltersForSearch from "@/components/search/FiltersForSearch";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { XStack } from "@/components/ui/Stack";
import { iconSize } from "@/constants/tokens";

export default function SearchPage() {
	return (
		<>
			<BackNav title="Search" />
			<XStack className="my-4">
				<FiltersForSearch />
				<Input className="w-full" placeholder="search here..." />
				<Button variant="icon">
					<Search size={iconSize - 4} />
				</Button>
			</XStack>
			<Feed />
		</>
	);
}
