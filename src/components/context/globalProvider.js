"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { user } = useUser();

    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const [tickets, setTickets] = useState([]);

    const theme = themes[selectedTheme];

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const collapseMenu = () => {
        setCollapsed(!collapsed);
    };

    const allTickets = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/tickets");

            const sorted = res.data.sort((a, b) => {
                return (
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            });

            setTickets(sorted);

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTicket = async (id) => {
        try {
            const res = await axios.delete(`/api/tickets/${id}`);
            toast.success("Ticket deleted");

            allTickets();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const updateTicket = async (ticket) => {
        try {
            const res = await axios.put(`/api/tickets`, ticket);

            toast.success("Ticket updated");

            allTickets();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const completedTickets = tickets.filter((ticket) => ticket.isCompleted === true);
    const importantTickets = tickets.filter((ticket) => ticket.isImportant === true);
    const incompleteTickets = tickets.filter((ticket) => ticket.isCompleted === false);

    React.useEffect(() => {
        if (user) allTickets();
    }, [user]);

    return (
        <GlobalContext.Provider
            value={{
                theme,
                tickets,
                deleteTicket,
                isLoading,
                completedTickets,
                importantTickets,
                incompleteTickets,
                updateTicket,
                modal,
                openModal,
                closeModal,
                allTickets,
                collapsed,
                collapseMenu,
            }}
        >
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);