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
                            return <GeneralTicket onTicketClick={(id) => props.onTicketClick(id)} userType={props.userType} ticket={ticket} />
                        })
                 }
                </div>
            )
        } else {
            return (
                <div className='small-ticket-list'>
                    {
                        props.tickets.map( ticket => {
                            return <SmallGeneralTicket onTicketClick={(id) => props.onTicketClick(id)} userType={props.userType} ticket={ticket}/>
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