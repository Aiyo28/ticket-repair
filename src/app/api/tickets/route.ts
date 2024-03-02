import prisma from '@/components/utils/connect';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized', status: 401 });
		}

		const { title, content, date, completed, important } = await req.json();

		if (!title || !content || !date) {
			return NextResponse.json({
				error: 'Missing required fields',
				status: 400,
			});
		}

		if (title.length < 3) {
			return NextResponse.json({
				error: 'Title must be at least 3 characters long',
				status: 400,
			});
		}

		const ticket = await prisma.ticket.create({
			data: {
				title,
				content,
				date,
				isCompleted: completed,
				isImportant: important,
				userId,
			},
		});

		console.log('Ticket created: ', ticket);

		return NextResponse.json(ticket);
	} catch (error) {
		console.log('ERROR CREATING TICKET: ', error);
		return NextResponse.json({
			error: 'Error creating ticket',
			status: 500,
		});
	}
}

export async function GET(req: Request) {
	try {
		const { userId } = auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized', status: 401 });
		}

		const tickets = await prisma.ticket.findMany({
			where: {
				userId,
			},
		});

		return NextResponse.json(tickets);
	} catch (error) {
		console.log('ERROR GETTING TICKETS: ', error);
		return NextResponse.json({
			error: 'Error updating ticket',
			status: 500,
		});
	}
}

export async function PUT(req: Request) {
	try {
		const { userId } = auth();
		const { isCompleted, id } = await req.json();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized', status: 401 });
		}

		const ticket = await prisma.ticket.update({
			where: {
				id,
			},
			data: {
				isCompleted,
			},
		});

		return NextResponse.json(ticket);
	} catch (error) {
		console.log('ERROR UPDATING TICKET: ', error);
		return NextResponse.json({
			error: 'Error deleting ticket',
			status: 500,
		});
	}
}
