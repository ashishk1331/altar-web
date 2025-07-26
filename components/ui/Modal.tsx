"use client";

import {
	createContext,
	type PropsWithChildren,
	type ReactNode,
	useContext,
	useState,
	useEffect,
	useRef,
} from "react";
import { YStack } from "./Stack";

export type ModalContextType = {
	openModal: (children: ReactNode) => void;
	closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
	const modal = useContext(ModalContext);
	if (!modal) throw Error("Unable to read modal context");
	return modal;
}

export function ModalWrapper({ children }: PropsWithChildren) {
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);

	function openModal(children: ReactNode) {
		setModalContent(children);
	}

	function closeModal() {
		setModalContent(null);
	}

	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			{modalContent && (
				<ModalBody closeModal={closeModal}>{modalContent}</ModalBody>
			)}
			{children}
		</ModalContext.Provider>
	);
}

function ModalBody({
	children,
	closeModal,
}: PropsWithChildren & { closeModal: () => void }) {
	const modalRef = useRef<HTMLDivElement>(null);

	// Handle Escape key to close
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") closeModal();
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [closeModal]);

	// Handle click outside to close
	function handleClickOutside(event: React.MouseEvent) {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			closeModal();
		}
	}

	return (
		<YStack
			className="z-[99] fixed inset-0 w-full h-full bg-neutral-300/25 dark:bg-neutral-900/40 backdrop-blur-xs p-8 items-center justify-around"
			onClick={handleClickOutside}
		>
			<YStack ref={modalRef} onClick={(e) => e.stopPropagation()}>
				{children}
			</YStack>
		</YStack>
	);
}
