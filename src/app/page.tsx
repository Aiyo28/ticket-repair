'use client';
import Tickets from '@/components/Tickets';
import { useGlobalState } from '@/components/context/globalProvider';

export default function Home() {
	const { tickets } = useGlobalState();

	return <Tickets title="All Tickets" tickets={tickets} />;
}
