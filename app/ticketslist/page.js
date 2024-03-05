"use client";

import './tickets.css';


import { useState, useEffect } from 'react';

export default function ListTickets() {
    const [data, setData] = useState([]);
    const [filteredTicket, setFilteredTicket] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const reqData = await fetch('/tickets');
            const apiData = await reqData.json();

            setData(apiData.ticketsList);
        }

        getData();
    }, []);

    const handleTicketsContent = (id) => {
        const ticketsFilter = data.filter((ticket) => {
            return ticket.id == id;
        });

        setFilteredTicket(ticketsFilter);
    }

    const handleDeleteTicket = async (id) => {
        console.log(id);

        await fetch(`/tickets/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
        .then((response) => console.log(response))
    }

    return (
        <div className="tickets-container">
            <ul className="ticketsList-wrapper">
                {data.map((tickets, index) => {
                    return (
                        <li key={index} onClick={() => handleTicketsContent(tickets.id)}>
                            <h1>{tickets.taskName}</h1>
                        </li>
                    )
                })}
            </ul>

            <div className="tickets-content">
                {filteredTicket.map((ticket, index) => {
                    return (
                        <div className="tickets-content-inner" key={index}>
                            <div className="ticket-header">
                                <h1>{ticket.taskName}</h1>
                                <h3>{ticket.taskSubdescription}</h3>
                            </div>

                            <p>{ticket.taskDescription}</p>

                            <button onClick={() => handleDeleteTicket(ticket.id)}>Encerrar</button>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}