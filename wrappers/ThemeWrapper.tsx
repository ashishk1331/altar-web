"use client";

import { useConfigStore } from '@/store/configStore';
import { type PropsWithChildren, useEffect } from 'react';

export default function ThemeWrapper({ children }: PropsWithChildren) {
	const initializeDarkMode = useConfigStore(state => state.initializeDarkMode);
	
	useEffect(() => {
		initializeDarkMode();
	}, [initializeDarkMode]);
	
	return children;
}