import React from 'react';
import GeneralTicket from './GeneralTicket';
import SmallGeneralTicket from './SmallGeneralTicket';

const TicketList = props => {

    const renderCorrectTickets = () => {
        if(props.size === 'large') {
            return (
                <div className='ticket-list'>
                 {
                        props.tickets.map( ticket => {
                            // console.log("ticketlist large", ticket.ticket)
                            //data mapped to compenent is within ticket
                            return <GeneralTicket key={ticket.ticket.id} onTicketClick={(id) => props.onTicketClick(id)} ticket={ticket} />
                        })
                 }
                </div>
            )
        } else {
            return (
                <div className='small-ticket-list'>
                    {
                        props.tickets.map( ticket => {
                            // console.log("ticketlist", ticket)
                            return <SmallGeneralTicket onTicketClick={(id) => props.onTicketClick(id)}  ticket={ticket}/>
                        })
                    }
                </div>
            )
        }
    }
    return (
        <div className='ticket-list-container'>
            { renderCorrectTickets() }
        </div>
    )
}



export default TicketList;