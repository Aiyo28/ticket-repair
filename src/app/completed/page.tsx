'use client';
import React from 'react';
import { useGlobalState } from '@/components/context/globalProvider';
import Tickets from '@/components/Tickets';

function page() {
	const { completedTickets } = useGlobalState();
	return <Tickets title="Completed Tickets" tickets={completedTickets} />;
}

export default page;
