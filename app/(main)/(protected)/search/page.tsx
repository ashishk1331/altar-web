"use client";
import { Search } from "lucide-react";
import BackNav from "@/components/blocks/BackNav";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { XStack } from "@/components/ui/Stack";
import { debounceDelay, iconSize, initialNumItems } from "@/constants/tokens";
import { useState, useEffect } from "react";
import Feed from "@/components/home/Feed";
import EmptyFeed from "@/components/poem/EmptyFeed";
import { useDebouncedCallback } from "use-debounce";
import { callToast } from "@/components/ui/Toast";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SearchPage() {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [hasSearched, setHasSearched] = useState(false);

	// Use the paginated query - it will only run when debouncedSearch is not empty
	const {
		results,
		status,
		loadMore,
		isLoading: isPaginationLoading,
	} = usePaginatedQuery(
		api.poems.searchPoem,
		debouncedSearch ? { searchText: debouncedSearch } : "skip",
		{ initialNumItems },
	);

	// Debounced callback to update the search term
	const debouncedSetSearch = useDebouncedCallback((searchTerm: string) => {
		setDebouncedSearch(searchTerm);
		if (searchTerm) {
			setHasSearched(true);
		}
	}, debounceDelay);

	// Update debounced search when search changes
	useEffect(() => {
		if (search.trim()) {
			debouncedSetSearch(search.trim());
		} else {
			setDebouncedSearch("");
			setHasSearched(false);
		}
	}, [search, debouncedSetSearch]);

	const handleSearch = () => {
		if (!search.trim()) {
			callToast.alert("Write something first to search");
			return;
		}
		// Force immediate search by updating debouncedSearch directly
		setDebouncedSearch(search.trim());
		setHasSearched(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const isLoading = status === "LoadingFirstPage" || isPaginationLoading;
	const poems = results || [];

	return (
		<>
			<BackNav title="Search" />
			<XStack className="my-4">
				<Input
					value={search}
					onChange={handleInputChange}
					className="w-full"
					placeholder="search here..."
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSearch();
						}
					}}
				/>
				<Button variant="icon" disabled={isLoading} onClick={handleSearch}>
					<Search size={iconSize} />
				</Button>
			</XStack>

			{poems.length > 0 ? (
				<>
					<Feed poems={poems} />
					{status === "CanLoadMore" && (
						<Button
							onClick={() => loadMore(initialNumItems)}
							disabled={isPaginationLoading}
							isLoading={isPaginationLoading}
							className="mt-4"
						>
							Load More
						</Button>
					)}
				</>
			) : (
				<EmptyFeed
					message={
						hasSearched
							? isLoading
								? "Searching..."
								: "No poems found."
							: "Start typing to search poems"
					}
				/>
			)}
		</>
	);
}
