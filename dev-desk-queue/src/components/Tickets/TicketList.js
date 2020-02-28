import React from 'react';
import GeneralTicket from './GeneralTicket';

const TicketList = props => {
    return (
        <div className='ticket-list'>
            {
                props.tickets.map( ticket => {
                    return <GeneralTicket onTicketClick={(id) => props.onTicketClick(id)} userType={props.userType} ticket={ticket} />
                })
            }
        </div>
    )
}

export default TicketList;