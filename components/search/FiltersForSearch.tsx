"use client";

import { Check, Funnel } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { iconSize } from "@/constants/tokens";
import { type SearchStoreState, useSearchStore } from "@/store/searchStore";
import Button from "../ui/Button";
import {
	DropdownContent,
	DropdownTrigger,
	DropdownWrapper,
} from "../ui/Dropdown";
import { P } from "../ui/Heading";
import { YStack } from "../ui/Stack";

type FilterOption = {
	label: string;
	filter: SearchStoreState["filter"];
};

export default function FiltersForSearch() {
	const [filter, setFilter] = useSearchStore(
		useShallow((state) => [state.filter, state.setFilter]),
	);
	const filterOptions: FilterOption[] = [
		{
			label: "Poems",
			filter: "poems",
		},
		{
			label: "Users",
			filter: "users",
		},
	];

	return (
		<DropdownWrapper>
			<DropdownTrigger>
				<Button variant="icon" className="relative">
					<Funnel size={iconSize} />
					<div className="absolute top-0 right-0 w-2 h-2 -translate-x-full translate-y-full aspect-sqaure bg-indigo-500 rounded-full" />
				</Button>
			</DropdownTrigger>
			<DropdownContent left>
				<YStack className="p-2 bg-white rounded shadow-xl mr-2 items-start gap-0 *:w-full">
					{filterOptions.map(({ label, filter: defaultFilter }) => (
						<Button
							key={label}
							variant="outline"
							onClick={() => setFilter(defaultFilter)}
							className={
								filter === defaultFilter
									? "text-indigo-500 hover:bg-indigo-50"
									: ""
							}
						>
							<Check
								size={iconSize}
								className={filter === defaultFilter ? "visible" : "invisible"}
							/>
							<P>{label}</P>
						</Button>
					))}
				</YStack>
			</DropdownContent>
		</DropdownWrapper>
	);
}
