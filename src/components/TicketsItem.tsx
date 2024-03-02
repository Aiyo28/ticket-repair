'use client';
import { useGlobalState } from '@/components/context/globalProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import formatDate from '@/components/utils/formatDate';

interface Props {
	title: string;
	content: string;
	date: string;
	isImportant: boolean;
	isCompleted: boolean;
	id: string;
}

function TicketItem({
	title,
	content,
	date,
	isImportant,
	isCompleted,
	id,
}: Props) {
	const { theme, deleteTicket, updateTicket } = useGlobalState();
	return (
		<TicketItemStyled theme={theme}>
			<h1>{title}</h1>
			<p>{content}</p>

			<p className="date">{formatDate(date)}</p>
			<div className="ticket-footer">
				{isCompleted ? (
					<button
						className="completed"
						onClick={() => {
							const ticket = {
								id,
								isCompleted: !isCompleted,
							};

							updateTicket(ticket);
						}}
					>
						Completed
					</button>
				) : (
					<button
						className="incomplete"
						onClick={() => {
							const ticket = {
								id,
								isCompleted: !isCompleted,
							};

							updateTicket(ticket);
						}}
					>
						Incomplete
					</button>
				)}
				<button className="edit">
					<FontAwesomeIcon icon={faEdit} />
				</button>
				<button
					className="delete"
					onClick={() => {
						deleteTicket(id);
					}}
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</TicketItemStyled>
	);
}

const TicketItemStyled = styled.div`
	padding: 1.2rem 1rem;
	border-radius: 1rem;
	background-color: ${(props) => props.theme.borderColor2};
	box-shadow: ${(props) => props.theme.shadow7};
	border: 2px solid ${(props) => props.theme.borderColor2};

	height: 16rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	.date {
		margin-top: auto;
	}

	> h1 {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.ticket-footer {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		button {
			border: none;
			outline: none;
			cursor: pointer;

			i {
				font-size: 1.4rem;
				color: ${(props) => props.theme.colorGrey2};
			}
		}

		.edit {
			margin-left: auto;
		}

		.completed,
		.incomplete {
			display: inline-block;
			padding: 0.4rem 1rem;
			background: ${(props) => props.theme.colorDanger};
			border-radius: 30px;
		}

		.completed {
			background: ${(props) => props.theme.colorGreenDark} !important;
		}
	}
`;

export default TicketItem;
