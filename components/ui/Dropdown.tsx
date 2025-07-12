"use client";

import {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type RefObject,
	type SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

type DropdownContextType = {
	isDropdownOpen: boolean;
	setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
	triggerRef: RefObject<HTMLButtonElement | null>;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

function useDropdownContext() {
	const ctx = useContext(DropdownContext);
	if (!ctx)
		throw new Error("Dropdown components must be used inside DropdownWrapper");
	return ctx;
}

export function DropdownWrapper({ children }: PropsWithChildren) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<DropdownContext.Provider
			value={{ isDropdownOpen, setIsDropdownOpen, triggerRef }}
		>
			<div className="relative">{children}</div>
		</DropdownContext.Provider>
	);
}

export function DropdownTrigger({ children }: PropsWithChildren) {
	const { setIsDropdownOpen, triggerRef } = useDropdownContext();

	return (
		<button
			type="button"
			ref={triggerRef}
			onClick={() => setIsDropdownOpen((prev) => !prev)}
			className="relative cursor-pointer"
		>
			{children}
		</button>
	);
}

type DropdownContentProps = {
	left?: boolean;
};

export function DropdownContent({
	children,
	left = false,
}: PropsWithChildren & DropdownContentProps) {
	const { isDropdownOpen, setIsDropdownOpen, triggerRef } =
		useDropdownContext();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const target = event.target as Node;
			if (
				contentRef.current?.contains(target) ||
				triggerRef.current?.contains(target)
			) {
				return;
			}
			setIsDropdownOpen(false);
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setIsDropdownOpen, triggerRef]);

	if (!isDropdownOpen) return null;

	return (
		<div
			ref={contentRef}
			className={twMerge(
				"absolute top-full z-50 mt-2",
				left ? "left-0" : "right-0",
			)}
		>
			{children}
		</div>
	);
}

export function DropdownItem({
	children,
	onClick,
	className: passedOnClassName,
	...props
}: PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { setIsDropdownOpen } = useDropdownContext();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(event);
		setIsDropdownOpen(false);
	};

	return (
		<Button
			variant="outline"
			onClick={handleClick}
			className={twMerge(passedOnClassName, "hover:bg-neutral-50")}
			{...props}
		>
			{children}
		</Button>
	);
}
