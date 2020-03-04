import React from 'react';
import {connect} from "react-redux";

const GeneralTicket = props => {

    const renderHelperInformation = () => {
        if(props.userType === '1') {
            return (
                    <h4>Author: {props.ticket.author}</h4>
            )
        }
    }

    const renderStudentInformation = () => {
        if(props.userType === '0') {
            return (
                <h4>Helper: {props.ticket.helper}</h4>
            )
        }
    }

    return (
        <div className='general-ticket' onClick={() => props.onTicketClick(props.ticket.id)}>
            {/* This ticket will display all of the information and not be editable, when clicked will have a popup */}
            
            <div className='status-container'>
                {props.ticket.status}
            </div>
            
            <h4>Title: {props.ticket.title}</h4>
            <p>Description: {props.ticket.description}</p>
            <p>What I've tried: {props.ticket.tried}</p>
            <h4>Category: {props.ticket.category}</h4>
            <h4>Date Added: {props.ticket.dateAdded}</h4>
        
            { renderHelperInformation() }
            { renderStudentInformation() }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        userType: state.userType,
        
    }
}

export default connect(mapStateToProps, {})(GeneralTicket);