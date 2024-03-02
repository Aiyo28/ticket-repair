'use client';
import React from 'react';
import { useGlobalState } from '@/components/context/globalProvider';
import Tickets from '@/components/Tickets';

function page() {
	const { importantTickets } = useGlobalState();
	return <Tickets title="Important Tickets" tickets={importantTickets} />;
}

export default page;
