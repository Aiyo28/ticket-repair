import prisma from '@/components/utils/connect';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { userId } = auth();
		const { id } = params;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const ticket = await prisma.ticket.delete({
			where: {
				id,
			},
		});

		return NextResponse.json(ticket);
	} catch (error) {
		console.log('ERROR DELETING TICKET: ', error);
		return NextResponse.json({
			error: 'Error deleting ticket',
			status: 500,
		});
	}
}
