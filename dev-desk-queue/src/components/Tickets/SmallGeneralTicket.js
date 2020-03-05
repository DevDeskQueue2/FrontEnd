import React from 'react';
import {connect} from "react-redux"

const SmallGeneralTicket = props => {

    const renderHelperInformation = () => {
        if(props.userType === '1') {
            return (
                    <h4>Author: {props.ticket.author}</h4>
            )
        }
    }

    // const renderStudentInformation = () => {
    //     if(props.userType === '0') {
    //         return (
    //             <h4>Helper: {props.ticket.helper}</h4>
    //         )
    //     }
    // }

    return (
        <div className='small-general-ticket' onClick={() => props.onTicketClick(props.ticket.ticket.id)}>
            {/* This ticket will display all of the information and not be editable, when clicked will have a popup */}
            
            <div className='small-status-container'>
                {props.ticket.ticket.status}
            </div>
            
            <h4>Title: {props.ticket.ticket.title}</h4>

            <h4>Category: {props.ticket.ticket.category}</h4>


        </div>
    )
}

const mapStateToProps = state => {
    return {
        userType: state.userType,

    }
}
export default connect(mapStateToProps,{})(SmallGeneralTicket);