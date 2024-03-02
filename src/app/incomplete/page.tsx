'use client';
import React from 'react';
import { useGlobalState } from '@/components/context/globalProvider';
import Tickets from '@/components/Tickets';

function page() {
	const { incompleteTickets } = useGlobalState();
	return <Tickets title="Incomplete Tickets" tickets={incompleteTickets} />;
}

export default page;
