import { twJoin } from "tailwind-merge";

type SkeletonProps = {
	className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
	return (
		<div className={twJoin(
			"bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse", 
			className,
		)} />
	)
}